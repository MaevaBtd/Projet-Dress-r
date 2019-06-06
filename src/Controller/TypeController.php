<?php

namespace App\Controller;



use App\Repository\TypeRepository;


use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api", name="api_")
 */
class TypeController extends AbstractController
{

    /**
     * Retourne tout les Types
     *
     * @Route("/types/", name="all_types", methods={"GET"})
     */
    public function allTypes(TypeRepository $repository, SerializerInterface $serializer)
    {


        $types = $repository->findAll();


        $json = $serializer->serialize($types, 'json', [
            'groups' => 'types_read',
        ]);

        // types_read retourne = tout les Types : id, name

        return JsonResponse::fromJsonString($json);
    }

}
