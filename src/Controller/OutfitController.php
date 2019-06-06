<?php

namespace App\Controller;


use App\Repository\OutfitRepository;
use App\Repository\UserRepository;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api", name="api_")
 */
class OutfitController extends AbstractController
{
    /**
     * Retourne les Outfits associés à un User 
     * 
     * @Route("/user/{id}/outfits", name="user_outfits", methods={"GET"})
     */
    public function index_outfit_user(UserRepository $repository, $id, SerializerInterface $serializer)
    {

        $user = $repository->findById($id);
        

        $json = $serializer->serialize($user, 'json',[
            'groups'=>'user_outfits'
        ]);

        // user_outfits retourne = un User : id ,username + les Outfits associés : id, name, createdAt

        return JsonResponse::fromJsonString($json);
    }


    /**
     * Retourne un Outfit et les Cloths associés
     *
     * @Route("/outfit/{id}/cloths", name="outfit_cloths", methods={"GET"})
     */
    public function index_cloths_outfit(OutfitRepository $repository, $id, SerializerInterface $serializer)
    {

        
        $outfit = $repository->findById($id);
        
        dump($outfit);

        
        $json = $serializer->serialize($outfit, 'json',[
            'groups'=>'outfit_cloths'
        ]);
        
        // outfit_cloths retourne = un  Outfit :id, name, createdAt + les Cloths associés :  id, name, image, createdAt + le Style : id, name + Type : id, name


        return JsonResponse::fromJsonString($json);
    }

    
}

