<?php

namespace App\Controller;



use App\Repository\ClothRepository;

use App\Repository\StyleRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api", name="api_")
 */
class StyleController extends AbstractController
{

    
    /**
     * Retourne tout les Styles(id,name)
     *
     * @Route("/styles", name="index_styles", methods={"GET"})
     */
    public function index(StyleRepository $repository, SerializerInterface $serializer)
    {


        $styles = $repository->findAll();


        $json = $serializer->serialize($styles, 'json', [
            'groups' => 'styles_index',
        ]);

        // styles_index retourne = tout les Styles : id, name

        return JsonResponse::fromJsonString($json);
    }
}
