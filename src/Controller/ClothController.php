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

        // Return all user's cloths
        // Find the user with the repository
        
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
    public function new (Request $request,TypeRepository $typerepository, UserRepository $repository, ValidatorInterface $validator, SerializerInterface $serializer, EntityManagerInterface $manager, StyleRepository $stylerepository) {

        $newCloth = new Cloth();

        $form = $this->createForm(ClothType::class, $newCloth);

        // Si besoin de décode json
        // $data = json_decode($request->getContent(), true);

        // Pour les test postman ( post mais infos dans l'url )
        $form->submit($request->query->all());

        // Pour les vrai test front
        // $form->submit($request->request->all());
        // $form->handleRequest($request);

        $errors = $validator->validate($newCloth);
        
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
                $userToken = $this->getUser();
                $id = $userToken->getId();
                $user = $repository->findById($id);
                $newCloth->setUser($userToken);

                $type = $request->get('type');
                $typeCloth = $typerepository->findOneBy([
                    'name' => $type,
                ]);
                $newCloth->setType($typeCloth);

                // TODO Faire un array, et boucler en for each dessus
                $styles = $request->get('styles');

                    foreach ($styles as $style) {
                    // Boucler en foreach ici - début boucle
                    $styleCloth = $stylerepository->findOneBy([
                        'name' => $style,
                    ]);
                    $newCloth->addStyle($styleCloth);
                    // fin de la boucle
                    }

                $file = $newCloth->getImage();

            if (!is_null($file)) {
                $fileName = $this->generateUniqueFileName().'.'.$file->guessExtenstion();
                try {
                    $file->move(
                        $this->getParameter('image_directory'),
                        $fileName
                    );
                } catch (FileException $e) {
                    dump($e);
                }
                $newCloth->setImage($fileName);
            }

            $manager = $this->getDoctrine()->getManager();
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

            // Return a json response that show to the front that the delete is successfull OR NOT ( flash message )
            return new JsonResponse(array('flash' => 'Le vêtement a été supprimé !'));
        } else {

            return new JsonResponse(array('flash' => 'Vous n\'êtes pas propriétaire de ce vêtement !'));
        }
    }

    /**
     * @Route("/cloth/random", name="random_cloths", methods={"GET", "POST"})
     */
    public function random(ClothRepository $repository) {

        // Retrouver tout les vetements par style

        // Retrouver tout les vetements par type selon le style
        // On se retrouve avec 5 listes :
            // Tout les vetements de type Tete par style
            // Tout les vetements de type Veste par style
            // Tout les vetements de type Haut par style
            // Tout les vetements de type Bas par style
            // Tout les vetements de type Chaussure par style
        
        // On en pioche un au hasard dedans ( soit on fait un vrai hasard soit on shuffle les results et on prends le premier)
        // Dans chaque liste

        // On les ajoutent à notre $random[]
        // On le retourne en json

    }

    /**
     * @Route("/cloth/{id}/edit", name="edit_cloth", methods={"GET", "POST"})
     */
    public function edit(Request $request, Cloth $cloth): Response {

        // Faire un voters pour acces a cette page ou pas

        $oldImage = $cloth->getImage();
        if(!empty($oldImage)) {
            $cloth->setImage(
                new File($this->getParameter('image_directory').'/'.$oldImage)
            );
        }

        // Using a symfony form
        $form = $this->createForm(ClothType::class, $cloth);

        // Retrieving data send from REACT ( don't know if we really need to decode )
        $data = json_decode($request->getContent(), true);

        // Giving the data to the form, a submission
        $form->submit($data);

        // Do we need to handle the request ?
        // $form->handleRequest($request);

        // Testing
        if ($form->isSubmitted() && $form->isValid()) {

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

            $em = $this->getDoctrine()->getManager();
            $em->persist($cloth);
            $em->flush();

            // Return a json response that show to the front that the creation is successfull ( flash message )
            return new JsonResponse(array('flash' => 'Le vêtement a été modifié avec succès !'));
        }

        // Else
        else {

            // Return a json response that show to the front that the creation was not successfull ( flash message )
            return new JsonResponse(array('flash' => 'Le vêtement n\'a pas pu être modifié !'));
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
