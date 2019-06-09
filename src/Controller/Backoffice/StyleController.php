<?php

namespace App\Controller\Backoffice;

use App\Entity\Style;
use App\Form\StyleType;
use App\Repository\StyleRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/backoffice", name="backoffice_")
 */
class StyleController extends AbstractController {

    
    /**
     * Retourne tout les Style (id,name)
     *
     * @Route("/styles", name="index_styles", methods={"GET"})
     */
    public function index(StyleRepository $repository)
    {

        $styles = $repository->findAll();

        return $this->render('backoffice/style/index.html.twig', [
            'styles' => $styles
        ]);
    }


    /**
     * Ajoute un style à la BDD
     * 
     *@Route("/new/style", name="new_style", methods={"GET","POST"})
     */
    public function new(Request $request, ObjectManager $manager): Response
    {

        $style = new Style();

        $form = $this->createForm(StyleType::class, $style);

        $form->handleRequest($request);
        
        if($form->isSubmitted() && $form->isValid()){

            
            $manager->persist($style);
            $manager->flush();

            $this->addFlash(
                'success',
                " Votre style a bien été enregisté!"
            );

            
            return $this->redirectToRoute('backoffice_index_styles');
        }
      
        return $this->render('backoffice/style/new.html.twig',[
            'form' => $form->createView()
        ]);

    }



     /**
     * Retourne un Style (id, name) et permet de le modifier (name)
     *
     * @Route("/style/{id}/edit", name="edit_style", methods={"GET","POST"})
     */
    public function edit(Style $style, Request $request, ObjectManager $manager)
    {
        $form = $this->createForm(StyleType::class, $style);
        $form->handleRequest($request);

        if ($form->isSubmitted()&&$form->isValid())
        {
            $manager->persist($style);
            $manager->flush();

            $this->addFlash(
                'success',
                " le Style : {$style->getName()} a bien été modifié"
            );
        }
        return $this->render('backoffice/style/edit.html.twig', [
            'style' => $style,
            'form'=>$form->createView()
        ]);
    }


    /**
     * Supprime un Style
     *
     * @Route("/style/{id}/delete", name="delete_style", methods={"GET"})
     */
    public function delete(Style $style): Response
    {
        $manager = $this->getDoctrine()->getManager();
        $manager->remove($style);
        $manager->flush();

        $this->addFlash(
            'success',
            "Le style : {$style->getName()}  a bien été supprimée ! } "

        );
        return $this->redirectToRoute("backoffice_index_styles");
    }

}