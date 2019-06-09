<?php

namespace App\Controller\Backoffice;

use App\Entity\User;
use App\Form\UserRoleType;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/backoffice", name="backoffice_")
 */
class UserController extends AbstractController
{

   
    /**
     * Retourne tout les User (id,username)
     *
     * @Route("/users", name="index_users", methods={"GET"})
     */
    public function index(UserRepository $repository)
    {

        $users = $repository->findAll();

        return $this->render('backoffice/user/index.html.twig', [
            'users' => $users
        ]);
    }


    /**
     * Retourne un User (id, username, email, role, createdAt) et permet de modifier son Role
     *
     * @Route("/user/{id}/edit", name="edit_user", methods={"GET","POST"})
     */
    public function edit(User $user, Request $request, ObjectManager $manager)
    {
        $form = $this->createForm(UserRoleType::class, $user);
        $form->handleRequest($request);
       
        if ($form->isSubmitted()&&$form->isValid())
        {
            $manager->persist($user);
            $manager->flush();

            $this->addFlash(
                'success',
                " le Role de  {$user->getUsername()} a bien été modifié"
            );
        }

        return $this->render('backoffice/user/edit.html.twig', [
            'user' => $user,
            'form'=>$form->createView()
        ]);
    }

    /**
     * Supprime un User
     *
     * @Route("/user/{id}/delete", name="delete_user", methods={"GET"})
     */
    public function delete(User $user): Response
    {
        $manager = $this->getDoctrine()->getManager();
        $manager->remove($user);
        $manager->flush();

        $this->addFlash(
            'success',
            "L'Utilisateur'  a bien été supprimée ! } "

        );
        return $this->redirectToRoute("backoffice_index_users");
    }
}

