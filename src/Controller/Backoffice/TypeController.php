<?php

namespace App\Controller\Backoffice;

use App\Entity\Type;
use App\Form\TypeType;
use App\Repository\TypeRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


/**
 * @Route("/backoffice", name="backoffice_")
 */
class TypeController extends AbstractController {

        /**
         * Retourne tout les Type (id,name)
         *
         * @Route("/types", name="index_types", methods={"GET"})
         */
        public function index(TypeRepository $repository)
        {
    
            $types = $repository->findAll();
    
            return $this->render('backoffice/type/index.html.twig', [
                'types' => $types
            ]);
        }
    
    
        /**
         * Ajoute un Type à la BDD
         * 
         *@Route("/new/type", name="new_type", methods={"GET","POST"})
         */
        public function new(Request $request, ObjectManager $manager): Response
        {
    
            $type= new Type();
    
            $form = $this->createForm(TypeType::class, $type);
    
            $form->handleRequest($request);
            
            if($form->isSubmitted() && $form->isValid()){
    
                
                $manager->persist($type);
                $manager->flush();
    
                $this->addFlash(
                    'success',
                    " Votre type a bien été enregisté!"
                );
    
                
                return $this->redirectToRoute('backoffice_index_types');
            }
          
            return $this->render('backoffice/type/new.html.twig',[
                'form' => $form->createView()
            ]);
    
        }
    
    
    
         /**
         * Retourne un Type (id, name) et permet de le modifier (name)
         *
         * @Route("/type/{id}/edit", name="edit_type", methods={"GET","POST"})
         */
        public function edit(Type $type, Request $request, ObjectManager $manager)
        {
            $form = $this->createForm(TypeType::class, $type);
            $form->handleRequest($request);
    
            if ($form->isSubmitted()&&$form->isValid())
            {
                $manager->persist($type);
                $manager->flush();
    
                $this->addFlash(
                    'success',
                    " le type : {$type->getName()} a bien été modifié"
                );
            }
            return $this->render('backoffice/type/edit.html.twig', [
                'type' => $type,
                'form'=>$form->createView()
            ]);
        }
    
    // ******************************* EN TRAVAUX **********************************************************
        /**
         * Supprime un Type
         *
         * @Route("/type/{id}/delete", name="delete_type", methods={"GET"})
         */
        public function delete(Type $type): Response
        {
            $manager = $this->getDoctrine()->getManager();
            $manager->remove($type);
            $manager->flush();
    
            $this->addFlash(
                'success',
                "Le type : {$type->getName()}  a bien été supprimée ! } "
    
            );
            return $this->redirectToRoute("backoffice_index_types");
        }
    
    // *****************************************************************************************************
}