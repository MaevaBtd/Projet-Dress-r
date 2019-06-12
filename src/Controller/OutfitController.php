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
        $form->submit($request->query->all());

        // Pour les vrai test front
        // $form->submit($request->request->all());
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
                    'name' => $cloth,
                ]);
                $newOutfit->addCloth($outfitCloth);
                }

            $em = $this->getDoctrine()->getManager();
            $em->persist($newOutfit);
            $em->flush();

            // Return a json response that show to the front that the creation is successfull ( flash message )
            // Doit on retourner d'autres infos ? comme l'id de la tenue ?
            return new JsonResponse(array('flash' => 'La tenue a été ajoutée avec succès !'));
        }
    }

    /**
     * @Route("/outfit/{id}/edit", name="edit_outfit", methods={"GET", "POST"})
     */
    public function edit(Request $request, Outfit $outfit): Response {

        // Using a symfony form
        $form = $this->createForm(OutfitType::class, $outfit);

        // Retrieving data send from REACT ( don't know if we really need to decode )
        $data = json_decode($request->getContent(), true);

        // Giving the data to the form, a submission
        $form->submit($data);

        // Do we need to handle the request ?
        // $form->handleRequest($request);

        // Testing
        if ($form->isSubmitted() && $form->isValid()) {

            $em = $this->getDoctrine()->getManager();
            $em->persist($outfit);
            $em->flush();

            // Return a json response that show to the front that the creation is successfull ( flash message )
            // idem pour le retour create
            return new JsonResponse(array('flash' => 'La tenue a été modifiée avec succès !'));
        }

        // Else
        else {

            // Return a json response that show to the front that the creation was not successfull ( flash message )
            return new JsonResponse(array('flash' => 'La tenue n\'a pas pu être modifiée !'));
        }

    }

    /**
     * @Route("/outfit/{id}/delete", name="delete_outfit", methods={"GET"})
     */
    public function delete(Request $request, Outfit $outfit): Response {
    
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($outfit);
        $entityManager->flush();

        // Return a json response that show to the front that the delete is successfull OR NOT ( flash message )
        return new JsonResponse(array('flash' => 'La tenue a été supprimée !'));

    }

}

