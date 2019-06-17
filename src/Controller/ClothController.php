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
        
        // retrieves the user id and the user repository
        $userToken = $this->getUser();
        $id = $userToken->getId();
        $user = $repository->findById($id);

        // Handle Circular Reference-> use groups ( in order to select the properties i want to share ) in entities
        // Want user informations and all the cloths he got
        $json = $serializer->serialize($user, 'json', [
            'groups' => 'user_cloths',
        ]);

        // HTTP RESPONSE CODE 200
        return new JsonResponse($json,Response::HTTP_OK);
    }


    /**
     * @Route("/cloth/{id}", name="show_cloth", methods={"GET"})
     */
    public function show(ClothRepository $repository, $id, SerializerInterface $serializer) {

        $cloth = $repository->findById($id);
        // retrieves the user.id that creater the cloth
        $userClothId = $cloth->getUser()->getId();
        
        // retrieves the user.id from the token
        $userToken = $this->getUser();
        $userTokenId = $userToken->getId();

        // if its match, the coming user is the owner of the cloth
        // so he can access to the informations of this cloth
        if ($userClothId == $userTokenId) {

            $json = $serializer->serialize($cloth, 'json', [
                'groups' => 'cloth_read',
            ]);

            // HTTP RESPONSE CODE 200
            return new JsonResponse($json,Response::HTTP_OK);
        }

        // No match = you are not the owner of the cloth so you cant get these datas
        else {
            // HTTP RESPONSE CODE 401
            return new JsonResponse(array('flash' => 'Vous n\'êtes pas propriétaire de ce vêtement !'),Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/cloth/new", name="new_cloth", methods={"GET", "POST"})
     */
    public function new (Request $request,TypeRepository $typerepository, UserRepository $repository, ValidatorInterface $validator, SerializerInterface $serializer, EntityManagerInterface $manager, StyleRepository $stylerepository, ClothRepository $clothRepository) {

        // We got issues with deserialize method from $serializer
        // So we can't use it, and go for doing all the things manually
        $newCloth = new Cloth();

        // json decode for axios request
        $data = json_decode($request->getContent(), true);
        
        // retrieve user and user->id via token
        $userToken = $this->getUser();
        $userId = $userToken->getId();

        // retrieve the cloth's name that being post
        $nameJson = $data['name'];
        
        // security for existing cloth.name with the same user
        // We want that a cloth's name do not have to be unique in the DB
        // But we dont want that a user can have two cloth with the same name
        $clothStillExist = $clothRepository->findOneByUserId($nameJson, $userId);
        if (!empty($clothStillExist)) {
            // HTTP RESPONSE 400
            return new JsonResponse(array('flash' => 'Vous avez déjà un vêtement avec ce nom !',Response::HTTP_BAD_REQUEST));   
        }
       
        // Non existant cloth, so we can continue to add
        if (empty($clothStillExist)) {

            // retrieves datas et set them
            $withoutPantsJson = $data['onePart'];
            
            $newCloth->setWithoutPants($withoutPantsJson);
            $newCloth->setName($nameJson);
            $newCloth->setUser($userToken);
           
            // using repository for set types and styles
            $type = $data['type'];
            $typeCloth = $typerepository->findOneBy([
                'name' => $type,
            ]);
          
            if (!empty($typeCloth)) {
                $newCloth->setType($typeCloth);
            }
            
            $styles = $data['styles'];

            if (!empty($styles)) {
                foreach($styles as $style) {
                    $styleCloth = $stylerepository->findOneBy([
                        'name' => $style,
                    ]);
                    if (!empty($styleCloth)) {
                        $newCloth->addStyle($styleCloth);
                    }
                }
            }

            // We dont want a cloth without any style assigned
            if (empty($styles)) {
                // HTTP RESPONSE 400
                return new JsonResponse(array('flash' => 'Un vêtement doit au moins avoir un style .',Response::HTTP_BAD_REQUEST));
            }
            
            // TODO ADD A FILE
            
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
            
            // Validate the values directly in entities without a form
            // Many constraints are handle directly in the front
            $errors = $validator->validate($newCloth);
          
             
            if (count($errors) > 0) {
                // Initialize a stockage variable for errors messages
                $errorsString = [];

                // Retrieve the display message for each error
                foreach ($errors as $error) {
                    $errorsString[] = $error->getMessage();
                }
                
                // Convert it into json
                $json = $serializer->serialize($errorsString, 'json');

                // HTTP RESPONSE Code 409
                return new JsonResponse(array('flash' => $json),Response::HTTP_CONFLICT);
                
            }
            // There is no errors, we can persist and flush
            else {
                $manager->persist($newCloth);
                $manager->flush();

                // HTTP RESPONSE CODE 200
                return new JsonResponse(array('flash' => 'Le vêtement a été ajouté !',Response::HTTP_OK));
            }
        }
    }

    /**
     * @Route("/cloth/{id}/delete", name="delete_cloth", methods={"DELETE"})
     */
    public function delete(Request $request, Cloth $cloth): Response {

        // We are using an cloth.id in the route
        // But all users that are correctly log into the app recieve a token for one hour
        // So they can access to all api's routes with their token
        // in order to handle bad dehaviour from an user
        // we have to check if the user coming with his token is the real owner of the cloth

        // retrieves the user.id that creater the cloth
        $userClothId = $cloth->getUser()->getId();
        
        // retrieves the user.id from the token
        $userToken = $this->getUser();
        $userTokenId = $userToken->getId();

        // if its match, the coming user is the owner of the cloth
        if ($userClothId == $userTokenId) {

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($cloth);
            $entityManager->flush();

            // HTTP RESPONSE CODE 200
            return new JsonResponse(array('flash' => 'Le vêtement a été supprimé !',Response::HTTP_OK));

        } 
        // if not, no access allowed
        else {
            // HTTP RESPONSE CODE 401
            return new JsonResponse(array('flash' => 'Vous n\'êtes pas propriétaire de ce vêtement !',Response::HTTP_UNAUTHORIZED));
        }
    }

    /**
     * @Route("/cloth/random/style/{id}", name="random_cloths_by_style", methods={"GET"})
     */
    public function random(ClothRepository $repository, SerializerInterface $serializer, $id, UserRepository $userRepository) {

        $userToken = $this->getUser();
        $userId = $userToken->getId();

        $user = $userRepository->findOneBy([
            'id' => $userId,
        ]);

        $oldRandomNb = $user->getNbRandom();
        $nbRandomUser = $oldRandomNb + 1;
        $user->setNbRandom($nbRandomUser);
        
        $random = [];

        $heads = $repository->findHeadByIdAndStyleId($id,$userId);
        $jackets = $repository->findJacketByIdAndStyleId($id,$userId);
        $tops = $repository->findTopByIdAndStyleId($id,$userId);
        $bottoms = $repository->findBottomByIdAndStyleId($id,$userId);
        $shoes = $repository->findShoesByIdAndStyleId($id,$userId);

        // SOIT Je recupere tout ( select all ) -> je shuffle en php -> je prends le premier
        // SOIT random via SQL ( peur de ca, car ca creer des id temporaires a chaque entrée et apres ca en choisit une, donc il y a de l'ecriture)
        shuffle($heads);
        shuffle($jackets);
        shuffle($tops);
        shuffle($bottoms);
        shuffle($shoes);

        // We have to check if there is a result
        // Because if not we cant add them to the result, but we still want that a result can
        // contain few cloths, and do not need that each type have a cloth assigned
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

        if (empty($random)) {
            // HTTP RESPONSE CODE 400
            return new JsonResponse(array('flash' => 'Vous n\'avez aucun vêtement de ce style, veuillez en ajouter au moins un pour utiliser \'Dress Me\'', Response::HTTP_BAD_REQUEST));
        }

        else {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();
            
            $json = $serializer->serialize($random, 'json');

            // HTTP RESPONSE CODE 200
            return new JsonResponse($json,Response::HTTP_OK);
        }

    }

    /**
     * @Route("/cloth/{id}/edit", name="edit_cloth", methods={"GET", "POST"})
     */
    public function edit(Request $request, Cloth $cloth, ValidatorInterface $validator, SerializerInterface $serializer, EntityManagerInterface $manager, StyleRepository $stylerepository, ClothRepository $clothRepository): Response {

        // Check the owner
        $userClothId = $cloth->getUser()->getId();
        $userToken = $this->getUser();
        $userTokenId = $userToken->getId();

        if ($userClothId == $userTokenId) {
            // TODO IMAGE
            // $oldImage = $cloth->getImage();

            // if(!empty($oldImage)) {
            //     $cloth->setImage(
            //         new File($this->getParameter('image_directory').'/'.$oldImage)
            //     );
            // }

            // json decode for axios request
            $data = json_decode($request->getContent(), true);

            $nameJson = $data['name'];
            $oldName = $cloth->getName();
            // IF name json = getName, we do nothing for this property
            if ($nameJson !== $oldName) {
                $clothStillExist = $clothRepository->findOneByUserId($nameJson, $userTokenId);
                if (!empty($clothStillExist)) {
                // HTTP RESPONSE 400
                return new JsonResponse(array('flash' => 'Vous avez déjà un vêtement avec ce nom !',Response::HTTP_BAD_REQUEST));
                }
                else {
                    $cloth->setName($nameJson);
                }
            }

            $styles = $data['styles'];
            // If its not empty, the user want to change the cloth'styles
            if (!empty($styles)) {
                // Retrieve the old styles of the cloth
                $oldStyles = $cloth->getStyles();
                    
                // Delete each one before adding the new ones
                foreach ($oldStyles as $oldStyle) {
                    $clothOldStyleId = $oldStyle->getId();
                    $clothOldStyle = $stylerepository->findOneBy([
                        'id' => $clothOldStyleId,
                    ]);
                    $cloth->removeStyle($clothOldStyle);
                }

                // add the new styles to the cloth
                foreach ($styles as $style) {
                    $styleCloth = $stylerepository->findOneBy([
                        'name' => $style,
                    ]);
                    if (!empty($styleCloth)) {
                        $cloth->addStyle($styleCloth);
                    }
                }
            }

            if (empty($styles)) {
                // HTTP RESPONSE 400
                return new JsonResponse(array('flash' => 'Un vêtement doit au moins avoir un style .',Response::HTTP_BAD_REQUEST));
            }

            // TODO IMAGE
            // if(!is_null($cloth->getImage())){
                    
            //     $file = $cloth->getImage();
                
            //     $fileName = $this->generateUniqueFileName().'.'.$file->guessExtension();
            //     try {
            //         $file->move(
            //             $this->getParameter('image_directory'),
            //             $fileName
            //         );
            //     } catch (FileException $e) {
            //         dump($e);
            //     }
                    
            //     $cloth->setImage($fileName);
            //     if(!empty($oldImage)){
            //         unlink(
            //             $this->getParameter('image_directory') .'/'.$oldImage
            //         );
            //     }
            // } else {
            //         $cloth->setImage($oldImage);
            // }

            // set the update time
            $cloth->setUpdatedAt(new \DateTime());
        
            // check if all good in the entities's properties
            $errors = $validator->validate($cloth);

            if (count($errors) > 0) {

                $errorsString = [];
    
                foreach ($errors as $error) {
                    $errorsString[] = $error->getMessage();
                }
                
                $json = $serializer->serialize($errorsString, 'json');
    
                // HTTP RESPONSE Code 409
                return new JsonResponse(array('flash' => $json),Response::HTTP_CONFLICT);
                
            }
            else {
                $manager->persist($cloth);
                $manager->flush();
                // HTTP RESPONSE CODE 200
                return new JsonResponse(array('flash' => 'Le vêtement a été modifié !',Response::HTTP_OK));
            }
        } 
        
        else {
            // HTTP RESPONSE CODE 401
            return new JsonResponse(array('flash' => 'Vous n\'êtes pas propriétaire de ce vêtement !',Response::HTTP_UNAUTHORIZED));
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
