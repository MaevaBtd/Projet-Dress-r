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
     * Retourne tout les Styles
     *
     * @Route("/styles/", name="all_styles", methods={"GET"})
     */
    public function allStyles(StyleRepository $repository, SerializerInterface $serializer)
    {


        $styles = $repository->findAll();


        $json = $serializer->serialize($styles, 'json', [
            'groups' => 'styles_read',
        ]);

        // styles_read retourne = tout les Styles : id, name

        return JsonResponse::fromJsonString($json);
    }
}
