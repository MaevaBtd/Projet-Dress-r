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

        $outfit = $repository->findById($id);
        $userOutfitId = $outfit->getUser()->getId();
        
        $userToken = $this->getUser();
        $userTokenId = $userToken->getId();

        if ($userOutfitId == $userTokenId) {

            $json = $serializer->serialize($outfit, 'json',[
                'groups'=>'outfit_read'
            ]);

            //  HTTP RESPONSE Code 200
            return JsonResponse::fromJsonString($json,Response::HTTP_OK);
        }
        else {
            // HTTP RESPONSE CODE 401
            return new JsonResponse(array('flash' => 'Vous n\'êtes pas propriétaire de cette tenue !'),Response::HTTP_UNAUTHORIZED);
        }
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

            if (empty($cloths)) {
                // HTTP RESPONSE 400
                return new JsonResponse(array('flash' => 'Une tenue doit être au moins constituée d\'un vêtement .',Response::HTTP_BAD_REQUEST));
            }

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

                $errorsString = [];

                foreach ($errors as $error) {
                    $errorsString[] = $error->getMessage();
                }

                $json = $serializer->serialize($errorsString, 'json');
              
                // HTTP RESPONSE CODE 409
                return new JsonResponse(array('flash' => $json),Response::HTTP_CONFLICT);
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
    public function edit(Request $request, Outfit $outfit, ValidatorInterface $validator, SerializerInterface $serializer, EntityManagerInterface $manager, ClothRepository $clothRepository, OutfitRepository $outfitRepository): Response {

       
        $userOutfitId = $outfit->getUser()->getId();
        $userToken = $this->getUser();
        $userTokenId = $userToken->getId();

        if ($userOutfitId == $userTokenId) {

            
            $data = json_decode($request->getContent(), true);

            $nameJson = $data['name'];
            $oldName = $outfit->getName();
            
            if($nameJson !== $oldName){
                $outfitStillExist =
                $outfitRepository->findOneByUserId($nameJson, $userTokenId);
            
                if (!empty($outfitStillExist)) {
                // HTTP RESPONSE 400
                return new JsonResponse(array('flash' => 'Vous avez déjà une tenue avec ce nom !',Response::HTTP_BAD_REQUEST));
                }
                else {
                    $outfit->setName($nameJson);
                }
            }
            
            $cloths = $data['cloths'];

            if (!empty($cloths)) {

                $oldCloths = $outfit->getCloths();

                foreach ($oldCloths as $oldCloth) {
                    $outfitOldClothId = $oldCloth->getId();
                    $outfitOldCloth = $clothRepository->findOneBy([
                        'id' => $outfitOldClothId,
                    ]);
                    $outfit->removeCloth($outfitOldCloth);
                }

                foreach ($cloths as $cloth) {
                    $clothOutfit = $clothRepository->findOneBy([
                        'id' => $cloth,
                    ]);
                    if (!empty($clothOutfit)) {
                        $outfit->addCloth($clothOutfit);
                    }
                }
            }

            if (empty($cloths)) {
                // HTTP RESPONSE 400
                return new JsonResponse(array('flash' => 'Une tenue doit être au moins constituée d\'un vêtement .',Response::HTTP_BAD_REQUEST));
            }

            $outfit->setUpdatedAt(new \DateTime());

            $errors = $validator->validate($outfit);
            
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
                $manager->persist($outfit);
                $manager->flush();
                // HTTP RESPONSE CODE 200
                return new JsonResponse(array('flash' => 'La tenue a été modifié !',Response::HTTP_OK));
            }
        }
        else {
            // HTTP RESPONSE Code 401
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

