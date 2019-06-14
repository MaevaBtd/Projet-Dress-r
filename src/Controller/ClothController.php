<?php

namespace App\Controller;

use App\Entity\Cloth;
use App\Form\ClothType;
use App\Repository\TypeRepository;
use App\Repository\UserRepository;
use App\Repository\ClothRepository;
use App\Repository\StyleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

/**
  * @Route("/api", name="api_")
  */
class ClothController extends AbstractController
{
    /**
     * @Route("/user/cloths", name="user_cloths", methods={"GET"})
     */
    public function index_cloths_user(UserRepository $repository, SerializerInterface $serializer) {
        
        $userToken = $this->getUser();
        $id = $userToken->getId();
        $user = $repository->findById($id);

        // Handle Circular Reference-> use groups ( in order to select the properties i want to share ) in entities
        $json = $serializer->serialize($user, 'json', [
            'groups' => 'user_cloths',
        ]);

        return JsonResponse::fromJsonString($json);
    }


    /**
     * @Route("/cloth/{id}", name="show_cloth", methods={"GET"})
     */
    public function show(ClothRepository $repository, $id, SerializerInterface $serializer) {

        $cloth = $repository->findById($id);

        $json = $serializer->serialize($cloth, 'json', [
            'groups' => 'cloth_read',
        ]);

        return JsonResponse::fromJsonString($json);
    }

    /**
     * @Route("/cloth/new", name="new_cloth", methods={"GET", "POST"})
     */
    public function new (Request $request,TypeRepository $typerepository, UserRepository $repository, ValidatorInterface $validator, SerializerInterface $serializer, EntityManagerInterface $manager, StyleRepository $stylerepository, ClothRepository $clothRepository) {

        $newCloth = new Cloth();

        
        $form = $this->createForm(ClothType::class, $newCloth);

        // Si besoin de décode json
        // $data = json_decode($request->getContent(), true);


        // Pour les test postman ( post mais infos dans l'url )
        // $form = $this->createForm(ClothType::class, $newCloth);
        // $form->submit($request->query->all());

        // json decode for axios request
        $data = json_decode($request->getContent(), true);

        $nameJson = $data['name'];
        $withoutPantsJson = $data['onePart'];

        $newCloth->setWithoutPants($withoutPantsJson);
        $newCloth->setName($nameJson);
        // $name = $newCloth->getName();

        $userToken = $this->getUser();
        $newCloth->setUser($userToken);

        $type = $data['type'];
        $typeCloth = $typerepository->findOneBy([
            'name' => $type,
        ]);
        $newCloth->setType($typeCloth);
        // $newType = $newCloth->getType();

        $styles = $data['styles'];

            foreach($styles as $style) {
                $styleCloth = $stylerepository->findOneBy([
                    'name' => $style,
                ]);
                $newCloth->addStyle($styleCloth);
            }

        // $imageJson = $data['image'];
        // $file = $newCloth->getImage();
        // if (!is_null($file)) {
            //     $fileName = $this->generateUniqueFileName().'.'.$file->guessExtenstion();
            //     try {
            //         $file->move(
            //             $this->getParameter('image_directory'),
            //             $fileName
            //         );
            //     } catch (FileException $e) {
            //         dump($e);
            //     }
            //     $newCloth->setImage($fileName);
            // }
        
        $errors = $validator->validate($newCloth);
        
        $userId = $userToken->getId();
        $clothName = $newCloth->getName();

        $clothStillExist = $clothRepository->findOneByUserId($clothName, $userId);

        if (!empty($clothStillExist)) {
            $errors[] = 'Vous avez déjà un vêtement avec ce nom dans votre garde robe.';
        }

        if (count($errors) > 0) {
            /*
            * Uses a __toString method on the $errors variable which is a
            * ConstraintViolationList object. This gives us a nice string
            * for debugging.
            */
            $errorsString = (string) $errors;

            $json = $serializer->serialize($errorsString, 'json');

            // si il y a des erreurs, on retourne le pourquoi
            // TODO ajouter un httpresponse code
            return new JsonResponse($json);
        }

        else {
            $manager->persist($newCloth);
            $manager->flush();

            return new JsonResponse(array('flash' => 'Le vêtement a été ajouté avec succès !'));
        }
    }

    /**
     * @Route("/cloth/{id}/delete", name="delete_cloth", methods={"DELETE"})
     */
    public function delete(Request $request, Cloth $cloth): Response {

        $userClothId = $cloth->getUser()->getId();
        
        $userToken = $this->getUser();
        $userTokenId = $userToken->getId();

        if ($userClothId == $userTokenId) {

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($cloth);
            $entityManager->flush();

            return new JsonResponse(array('flash' => 'Le vêtement a été supprimé !'));

        } else {
            return new JsonResponse(array('flash' => 'Vous n\'êtes pas propriétaire de ce vêtement !'));
        }
    }

    /**
     * @Route("/cloth/random/style/{id}", name="random_cloths_by_style", methods={"GET"})
     */
    public function random(ClothRepository $repository, SerializerInterface $serializer, $id) {

        $cloths = $repository->findAll();
        
        $clothId = rand(1,1000);
        
        $random = [];
        
        $heads = $repository->findHeadByIdAndStyleId($id,$clothId);
        $jackets = $repository->findJacketByIdAndStyleId($id,$clothId);
        $tops = $repository->findTopByIdAndStyleId($id,$clothId);
        $bottoms = $repository->findBottomByIdAndStyleId($id,$clothId);
        $shoes = $repository->findShoesByIdAndStyleId($id,$clothId);

        shuffle($heads);
        shuffle($jackets);
        shuffle($tops);
        shuffle($bottoms);
        shuffle($shoes);
        
        if(!empty($heads)) {
            $oneHead = $heads[0];
            $random[] = $oneHead;
        }

        if(!empty($jackets)) {
            $oneJacket = $jackets[0];
            $random[] = $oneJacket;
        }

        if(!empty($tops)) {
            $oneTop = $tops[0];
            $random[] = $oneTop;
        }

        if(!empty($bottoms)) {
            $oneBottom = $bottoms[0];
            $random[] = $oneBottom;
        }

        if(!empty($shoes)) {
            $oneShoe = $shoes[0];
            $random[] = $oneShoe; 
        }

        $json = $serializer->serialize($random, 'json');

        return JsonResponse::fromJsonString($json);
    }

    /**
     * @Route("/cloth/{id}/edit", name="edit_cloth", methods={"GET", "POST"})
     */
    public function edit(Request $request, Cloth $cloth, TypeRepository $typerepository, UserRepository $repository, ValidatorInterface $validator, SerializerInterface $serializer, EntityManagerInterface $manager, StyleRepository $stylerepository): Response {

        $userClothId = $cloth->getUser()->getId();
        
        $userToken = $this->getUser();
        $userTokenId = $userToken->getId();

        if ($userClothId == $userTokenId) {

            $oldImage = $cloth->getImage();

            if(!empty($oldImage)) {
                $cloth->setImage(
                    new File($this->getParameter('image_directory').'/'.$oldImage)
                );
            }

            $form = $this->createForm(ClothType::class, $cloth);
            // $data = json_decode($request->getContent(), true);

            $styles = $request->get('styles');

                if (!empty($styles)) {

                    $oldStyles = $cloth->getStyles();
                    
                    foreach ($oldStyles as $oldStyle) {
                        $clothOldStyleId = $oldStyle->getId();
                         $clothOldStyle = $stylerepository->findOneBy([
                             'id' => $clothOldStyleId,
                         ]);
                         $cloth->removeStyle($clothOldStyle);
                    }
                    
                }
            
            // $form->submit($request->query->all());
            $form->submit($request->request->all());
            // $form->handleRequest($request);

            $errors = $validator->validate($cloth);
            
            if (count($errors) > 0) {
                /*
                * Uses a __toString method on the $errors variable which is a
                * ConstraintViolationList object. This gives us a nice string
                * for debugging.
                */
                $errorsString = (string) $errors;

                $json = $serializer->serialize($errorsString, 'json');

                // si il y a des erreurs, on retourne le pourquoi
                // TODO ajouter un httpresponse code
                return new JsonResponse($json);

            } else {

                $type = $request->get('type');
                $typeCloth = $typerepository->findOneBy([
                    'name' => $type,
                ]);
                $cloth->setType($typeCloth);

                // $styles = $request->get('styles');

                    foreach ($styles as $style) {
                    $styleCloth = $stylerepository->findOneBy([
                        'name' => $style,
                    ]);
                    $cloth->addStyle($styleCloth);
                    }

                if(!is_null($cloth->getImage())){
                    
                    $file = $cloth->getImage();
                
                    $fileName = $this->generateUniqueFileName().'.'.$file->guessExtension();
                    try {
                        $file->move(
                            $this->getParameter('image_directory'),
                            $fileName
                        );
                    } catch (FileException $e) {
                        dump($e);
                    }
                    
                    $cloth->setImage($fileName);
                    if(!empty($oldImage)){
                        unlink(
                            $this->getParameter('image_directory') .'/'.$oldImage
                        );
                    }
                } else {
                    
                    $cloth->setImage($oldImage);
                }

                $cloth->setUpdatedAt(new \DateTime());

                $manager->persist($cloth);
                $manager->flush();

                // Return a json response that show to the front that the creation is successfull ( flash message )
                return new JsonResponse(array('flash' => 'Le vêtement a été modifié avec succès !'));
            }
        } 

        else {
            return new JsonResponse(array('flash' => 'Vous n\'êtes pas propriétaire de ce vêtement !'));
        }

    }

    /**
     * @return string
     */
    private function generateUniqueFileName() {

        // md5() reduces the similarity of the file names generated by
        // uniqid(), which is based on timestamps
        return md5(uniqid());

    }
}
