<?php

namespace App\Controller;

use App\Entity\Cloth;
use App\Repository\UserRepository;
use App\Repository\ClothRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
  * @Route("/api", name="api_")
  */
class ClothController extends AbstractController
{
    /**
     * @Route("/user/{id}/cloths", name="user_cloths", methods={"GET"})
     */
    public function index_cloths_user(UserRepository $repository, $id, SerializerInterface $serializer) {

        // Retourne tout les vetements de l'utilisateur

        // METHODO :
        // Methode 1)
        // Find l'utilisateur par query builder
        // renvoyer tout les vetements avec un groupe ? 

        // Methode 2)
        // Find toutes les fringues selon l'id de l'utilisateur, via une requete QueryBuilder ou DQL
        // Renvoyer que le nom / type / style des vétements

        // Soucis imaginé : gérer l'association correctement pour chaque vetement de la réponse json.


        // Find the user with the repository
        $user = $repository->findById($id);

        // For handle Circular Reference, use groups ( select the properties i want to share ) in entities
        $json = $serializer->serialize($user, 'json', [
            'groups' => 'user_cloths',
        ]);

        return JsonResponse::fromJsonString($json);
    }


    /**
     * @Route("/cloth/{id}", name="show_cloth", methods={"GET"})
     */
    public function show(ClothRepository $repository, $id, SerializerInterface $serializer) {

        // Return data from one cloth, search by Id
        // Find the cloth with the repository
        $cloth = $repository->findById($id);

        // For handle Circular Reference, use groups ( select the properties i want to share ) in entities
        $json = $serializer->serialize($cloth, 'json', [
            'groups' => 'cloth_read',
        ]);

        return JsonResponse::fromJsonString($json);
    }
}
