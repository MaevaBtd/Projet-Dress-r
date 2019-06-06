<?php

namespace App\Controller;

use App\Repository\UserRepository;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api", name="api_")
 */
class UserController extends AbstractController
{
    /**
     * Retourne les informations de l'utilisateur(id,username,email,createdAt,role)
     * 
     * @Route("/user/{id}", name="user_show", methods={"GET"})
     */
    public function show(UserRepository $repository, $id, SerializerInterface $serializer)
    {

        $user = $repository->findById($id);

        $json = $serializer->serialize($user, 'json',[
            'groups'=>'user_show'
        ]);

        // user_show retourne = un User : id ,username, email, createdAt et son role: name

        return JsonResponse::fromJsonString($json);
    }

}