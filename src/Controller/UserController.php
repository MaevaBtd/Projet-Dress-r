<?php

namespace App\Controller;

use App\Entity\Role;

use App\Entity\User;
use App\Form\SubscribeType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Repository\ClothRepository;
use App\Repository\OutfitRepository;

/**
 * @Route("/api", name="api_")
 */
class UserController extends AbstractController {

    /**
     * Retourne les informations de l'utilisateur(id,username,email,createdAt,role)
     * 
     * @Route("/user/profile", name="user_show", methods={"GET"})
     */
    public function show(UserRepository $repository,ClothRepository $clothRepository,OutfitRepository $outfitRepository, SerializerInterface $serializer) {


        $userToken = $this->getUser();
        $id = $userToken->getId();
        $user = $repository->findById($id);

        // get all the cloths of the current User and count them 
        $userCloths = $clothRepository->findUserClothsByUserId($id);
        $nbCloths = count($userCloths);

         // get all the outfits of the current User and count them 
        $userOutfits = $outfitRepository->findUserOutfitsByUserId($id);
        $nbOutfits = count($userOutfits);
        

        $json = $serializer->serialize($user, 'json',[
            'groups'=>'user_show',
        ]);

        // HTTP RESPONSE Code 200
        return new JsonResponse(array(
            'infos' => $json,
            'nbCloths' => $nbCloths,
            'nbOutfits'=>$nbOutfits,
            ),Response::HTTP_OK);
    }

    /**
     * @Route("/register", name="register", methods={"GET","POST"})
     */
    public function new(Request $request, EntityManagerInterface $manager, UserPasswordEncoderInterface $passwordEncoder, ValidatorInterface $validator, SerializerInterface $serializer): Response {

        $user = new User();

        $form = $this->createForm(SubscribeType::class, $user);

        // Si on a besoin de decode ce qu'on recoit au cas ou.
        // $data = json_decode($request->getContent(), true);

        // Pour les test postman ( post mais infos dans l'url )
        // $form->submit($request->query->all());

        // Pour les vrai test front
        $form->submit($request->request->all());
        // $form->handleRequest($request);

        // Apres le submit on va check les erreurs sur les property de l'entité
        $errors = $validator->validate($user);
        
        
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
            
        }
        
        else {
            $hash = $passwordEncoder->encodePassword($user, $user->getPassword());
            $user->setPassword($hash);

            $roleRepository = $this->getDoctrine()->getRepository(Role::class);
            $role = $roleRepository->findOneBy(['name' => 'Utilisateur']);
            $user->setRole($role);
            
            $manager->persist($user);
            $manager->flush();
            
            // L'inscription a réussie
            // HTTP RESPONSE Code 200
            return new JsonResponse(array('flash' => 'Vous vous êtes inscrit avec succès !'),Response::HTTP_OK);
         }
    }

    /**
     * Edit les informations de l'utilisateur(username,email)
     * 
     * @Route("/user/edit", name="user_edit", methods={"GET", "POST"})
     */
    public function edit(UserRepository $userRepository, Request $request) {

        $userToken = $this->getUser();
        $id = $userToken->getId();
        $user = $userRepository->findById($id);

    }

}