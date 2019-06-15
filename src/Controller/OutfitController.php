<?php

namespace App\Controller;


use App\Entity\Outfit;
use App\Form\OutfitType;

use App\Repository\UserRepository;
use App\Repository\ClothRepository;
use App\Repository\OutfitRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api", name="api_")
 */
class OutfitController extends AbstractController
{
    /**
     * Retourne les Outfits(id,name) associés à un User(id,username) et les vêtements qui les composent(id,name)
     * 
     * @Route("/user/outfits", name="user_outfits", methods={"GET"})
     */
    public function index_outfit_user(UserRepository $repository, SerializerInterface $serializer)
    {
        $userToken = $this->getUser();
        $id = $userToken->getId();
        $user = $repository->findById($id);

        $json = $serializer->serialize($user, 'json',[
            'groups'=>'user_outfits'
        ]);

        // user_outfits retourne = un User : id ,username + les Outfits associés : id, name, createdAt
        // HTTP RESPONSE Code 200
        return JsonResponse::fromJsonString($json,Response::HTTP_OK);
    }

    /**
     * Retourne un Outfit(toutes les infos) et les Cloths associés(id,name,type,style,image)
     *
     * @Route("/outfit/{id}", name="outfit_show", methods={"GET"})
     */
    public function show(OutfitRepository $repository, $id, SerializerInterface $serializer)
    {

        // TODO VERIF USER
        
        $outfit = $repository->findById($id);

        $json = $serializer->serialize($outfit, 'json',[
            'groups'=>'outfit_read'
        ]);
        
        // outfit_cloths retourne = un  Outfit :id, name, createdAt + les Cloths associés :  id, name, image, createdAt + le Style : id, name + Type : id, name
        //  HTTP RESPONSE Code 200
        return JsonResponse::fromJsonString($json,Response::HTTP_OK);
    }

    /**
     * @Route("/outfit/new", name="new_outfit", methods={"GET", "POST"})
     */
    public function new(Request $request, ValidatorInterface $validator, SerializerInterface $serializer, EntityManagerInterface $manager, ClothRepository $clothRepository, OutfitRepository $outfitRepository) {

        // manually, if we had an outfit, the user is sending the cloths, and the name of the outfit. And we have to set the user.
        // v3: add a style to the outfit, a generic style or a personnal style that the user create for himself

        $newOutfit = new Outfit();

        $data = json_decode($request->getContent(), true);

        $userToken = $this->getUser();
        $userId = $userToken->getId();

        $nameJson = $data['name'];

        $outfitStillExist = $outfitRepository->findOneByUserId($nameJson, $userId);

        if (!empty($outfitStillExist)) {
            // HTTP RESPONSE 400
            return new JsonResponse(array('flash' => 'Vous avez déjà une tenue avec ce nom !',Response::HTTP_BAD_REQUEST));
        }

        else {

            $newOutfit->setName($nameJson);
            // $id = $userToken->getId();
            // $user = $userRepository->findById($id);
            $newOutfit->setUser($userToken);

            // sending the id of the cloths
            $cloths = $data['cloths'];
            foreach ($cloths as $cloth) {
                $clothOutfit = $clothRepository->findOneBy([
                    'id' => $cloth,
                ]);
                if(!empty($clothOutfit)) {
                    $newOutfit->addCloth($clothOutfit);
                }
            }

            $errors = $validator->validate($newOutfit);

            if (count($errors) > 0) {

                $errorsString = (string) $errors;

                $json = $serializer->serialize($errorsString, 'json');
              
                // HTTP RESPONSE CODE 409
                return new JsonResponse($json,Response::HTTP_CONFLICT);
            }

            else {
                $manager->persist($newOutfit);
                $manager->flush();

                // HTTP RESPONSE CODE 200
                return new JsonResponse(array('flash' => 'La tenue a été ajoutée avec succès !',Response::HTTP_OK));
            }
        }
    }

    /**
     * @Route("/outfit/{id}/edit", name="edit_outfit", methods={"GET", "POST"})
     */
    public function edit(Request $request, Outfit $outfit, UserRepository $userRepository, ValidatorInterface $validator, SerializerInterface $serializer, EntityManagerInterface $manager, ClothRepository $clothRepository): Response {

        $userOutfitId = $outfit->getUser()->getId();
        
        $userToken = $this->getUser();
        $userTokenId = $userToken->getId();

        if ($userOutfitId == $userTokenId) {

            $form = $this->createForm(OutfitType::class, $outfit);
            // $data = json_decode($request->getContent(), true);

            $cloths = $request->get('cloths');

                if (!empty($cloths)) {

                    $oldCloths = $outfit->getCloths();
                    // dd($oldCloths);
                    foreach ($oldCloths as $oldCloth) {
                        $outfitOldClothId = $oldCloth->getId();
                        // dd($outfitOldCloth);
                         $outfitOldCloth = $clothRepository->findOneBy([
                             'id' => $outfitOldClothId,
                         ]);
                        // dd($outfitOldCloth);
                         $outfit->removeCloth($outfitOldCloth);
                    }
                    
                }
            
            // $form->submit($request->query->all());
            $form->submit($request->request->all());
            // $form->handleRequest($request);

            $errors = $validator->validate($outfit);
            
            if (count($errors) > 0) {
                /*
                * Uses a __toString method on the $errors variable which is a
                * ConstraintViolationList object. This gives us a nice string
                * for debugging.
                */
                $errorsString = [];
    
                foreach ($errors as $error) {
                    $errorsString[] = $error->getMessage();
                }
                
                $json = $serializer->serialize($errorsString, 'json');
    
                // si il y a des erreurs, on retourne le pourquoi
                // HTTP RESPONSE Code 409
                return new JsonResponse(array('flash' => $json),Response::HTTP_CONFLICT);
                
            
            } else {

                foreach ($cloths as $cloth) {
                    $outfitCloth = $clothRepository->findOneBy([
                        'id' => $cloth,
                    ]);
                    $outfit->addCloth($outfitCloth);
                }

                $outfit->setUpdatedAt(new \DateTime());
                
                // $em = $this->getDoctrine()->getManager();
                $manager->persist($outfit);
                $manager->flush();

                // Return a json response that show to the front that the creation is successfull code 200
                return new JsonResponse(array('flash' => 'La tenue a été modifiée avec succès !',Response::HTTP_OK));
            }
        } 

        else {
            // return code 401
            return new JsonResponse(array('flash' => 'Vous n\'êtes pas propriétaire de cette tenue !',Response::HTTP_UNAUTHORIZED));
        }

    }

    /**
     * @Route("/outfit/{id}/delete", name="delete_outfit", methods={"DELETE"})
     */
    public function delete(Request $request, Outfit $outfit): Response {
    
        $userOutfitId = $outfit->getUser()->getId();
        
        $userToken = $this->getUser();
        $userTokenId = $userToken->getId();

        if ($userOutfitId == $userTokenId) {

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($outfit);
            $entityManager->flush();

            // Return a json response that show to the front that the delete is successfull OR NOT( flash message ) code 200
            return new JsonResponse(array('flash' => 'La tenue a été supprimée !',Response::HTTP_OK));
        }

        else {
            // Return code 401
            return new JsonResponse(array('flash' => 'Vous n\'êtes pas propriétaire de cette tenue !',Response::HTTP_UNAUTHORIZED));
        }
    }
}

