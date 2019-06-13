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

        return JsonResponse::fromJsonString($json);
    }

    /**
     * Retourne un Outfit(toutes les infos) et les Cloths associés(id,name,type,style,image)
     *
     * @Route("/outfit/{id}", name="outfit_show", methods={"GET"})
     */
    public function show(OutfitRepository $repository, $id, SerializerInterface $serializer)
    {

        $outfit = $repository->findById($id);

        $json = $serializer->serialize($outfit, 'json',[
            'groups'=>'outfit_read'
        ]);
        
        // outfit_cloths retourne = un  Outfit :id, name, createdAt + les Cloths associés :  id, name, image, createdAt + le Style : id, name + Type : id, name

        return JsonResponse::fromJsonString($json);
    }

    /**
     * @Route("/outfit/new", name="new_outfit", methods={"GET", "POST"})
     */
    public function new(Request $request, UserRepository $userRepository, ValidatorInterface $validator, SerializerInterface $serializer, EntityManagerInterface $manager, ClothRepository $clothRepository) {

        $newOutfit = new Outfit();

        // Using a symfony form
        $form = $this->createForm(OutfitType::class, $newOutfit);

        // Si besoin de décode json
        // $data = json_decode($request->getContent(), true);

        // Pour les test postman ( post mais infos dans l'url )
        // $form->submit($request->query->all());

        // Pour les vrai test front
        $form->submit($request->request->all());
        // $form->handleRequest($request);

        $errors = $validator->validate($newOutfit);
        
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
            // $id = $userToken->getId();
            // $user = $userRepository->findById($id);
            $newOutfit->setUser($userToken);

            $cloths = $request->get('cloths');

                foreach ($cloths as $cloth) {
                $outfitCloth = $clothRepository->findOneBy([
                    'id' => $cloth,
                ]);
                $newOutfit->addCloth($outfitCloth);
                }

            // $em = $this->getDoctrine()->getManager();
            $manager->persist($newOutfit);
            $manager->flush();

            // Return a json response that show to the front that the creation is successfull ( flash message )
            // Doit on retourner d'autres infos ? comme l'id de la tenue ?
            return new JsonResponse(array('flash' => 'La tenue a été ajoutée avec succès !'));
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
                $errorsString = (string) $errors;

                $json = $serializer->serialize($errorsString, 'json');

                // si il y a des erreurs, on retourne le pourquoi
                // TODO ajouter un httpresponse code
                return new JsonResponse($json);

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

                // Return a json response that show to the front that the creation is successfull ( flash message )
                return new JsonResponse(array('flash' => 'La tenue a été modifiée avec succès !'));
            }
        } 

        else {
            return new JsonResponse(array('flash' => 'Vous n\'êtes pas propriétaire de cette tenue !'));
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

            // Return a json response that show to the front that the delete is successfull OR NOT ( flash message )
            return new JsonResponse(array('flash' => 'La tenue a été supprimée !'));
        }

        else {
            return new JsonResponse(array('flash' => 'Vous n\'êtes pas propriétaire de cette tenue !'));
        }
    }
}

