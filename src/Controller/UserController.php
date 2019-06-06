<?php

namespace App\Controller;

use App\Entity\Role;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @Route("/api", name="api_")
 */
class UserController extends AbstractController {
    /**
     * Retourne les informations de l'utilisateur(id,username,email,createdAt,role)
     * 
     * @Route("/user/{id}", name="user_show", methods={"GET"})
     */
    public function show(UserRepository $repository, $id, SerializerInterface $serializer) {

        $user = $repository->findById($id);

        $json = $serializer->serialize($user, 'json',[
            'groups'=>'user_show'
        ]);

        // user_show retourne = un User : id ,username, email, createdAt et son role: name

        return JsonResponse::fromJsonString($json);
    }

    /**
     * @Route("/register", name="register", methods={"GET","POST"})
     */
    public function new(Request $request, EntityManagerInterface $em, UserPasswordEncoderInterface $passwordEncoder): Response {

        $user = new User();

        // TODO

        $form = $this->createForm(SubscribeType::class, $user);

        // Retrieving data send from REACT ( don't know if we really need to decode )
        $data = json_decode($request->getContent(), true);

        // Giving the data to the form, a submission
        $form->submit($data);

        // $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            
            $hash = $passwordEncoder->encodePassword($user, $user->getPassword());
            $user->setPassword($hash);

            $roleRepository = $this->getDoctrine()->getRepository(Role::class);
            $role = $roleRepository->findOneBy(['name' => 'Utilisateur']);
            $user->setRole($role);
            
            $manager->persist($user);
            $manager->flush();
            
            // Return a json response that show to the front that the creation is successfull ( flash message )
            return new JsonResponse(array('flash' => 'Vous vous êtes inscrit avec succès !'));

        }
        if ($form->isSubmitted() && !$form->isValid()) {
        
            // Return a json response that show to the front that the creation was not successfull ( flash message )
            return new JsonResponse(array('flash' => 'L\'inscription n\'a pas pu être effectuée !'));
            
        }

    }

}