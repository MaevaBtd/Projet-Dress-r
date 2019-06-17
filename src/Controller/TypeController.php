<?php

namespace App\Controller;

use App\Repository\TypeRepository;
use Symfony\Component\HttpFoundation\Response;
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
     * Retourne tout les Types(id,name)
     *
     * @Route("/types", name="index_types", methods={"GET"})
     */
    public function index(TypeRepository $repository, SerializerInterface $serializer)
    {

        $types = $repository->findAll();

        $json = $serializer->serialize($types, 'json', [
            'groups' => 'types_index',
        ]);

        // types_index retourne = tout les Types : id, name
        // Return code 200
        return JsonResponse::fromJsonString($json,Response::HTTP_OK);
    }

}
