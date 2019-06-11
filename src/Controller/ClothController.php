<?php

namespace App\Controller;

use App\Entity\Cloth;
use App\Repository\UserRepository;
use App\Repository\ClothRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

/**
  * @Route("/api", name="api_")
  */
class ClothController extends AbstractController
{
    /**
     * @Route("/user/{id}/cloths", name="user_cloths", methods={"GET"})
     */
    public function index_cloths_user(UserRepository $repository, $id, SerializerInterface $serializer) {

        // Return all user's cloths
        // Find the user with the repository
        $user = $repository->findById($id);

        // Handle Circular Reference-> use groups ( in order to select the properties i want to share ) in entities
        $json = $serializer->serialize($user, 'json', [
            'groups' => 'user_cloths',
        ]);

        return JsonResponse::fromJsonString($json);
    }


    /**
     * @Route("/cloth/{id}", name="show_cloth", methods={"GET"})
     */
    public function show(ClothRepository $repository, $id, SerializerInterface $serializer) {

        $cloth = $repository->findById($id);

        $json = $serializer->serialize($cloth, 'json', [
            'groups' => 'cloth_read',
        ]);

        return JsonResponse::fromJsonString($json);
    }

    /**
     * @Route("/cloth/new", name="new_cloth", methods={"GET", "POST"})
     */
    public function new (Request $request) {

        $newCloth = new Cloth();

        // Using a symfony form
        $form = $this->createForm(ClothType::class, $newCloth);

        // Retrieving data send from REACT ( don't know if we really need to decode )
        $data = json_decode($request->getContent(), true);

        // Giving the data to the form, a submission
        $form->submit($data);

        // Do we need to handle the request ?
        // $form->handleRequest($request);

        // Testing
        if ($form->isSubmitted() && $form->isValid()) {

            $file = $newCloth->getImage();

            if (!is_null($file)) {

                $fileName = $this->generateUniqueFileName().'.'.$file->guessExtenstion();

                try {

                    $file->move(
                        $this->getParameter('image_directory'),
                        $fileName
                    );
                } catch (FileException $e) {
                    dump($e);
                }

                $newCloth->setImage($fileName);
            }

            $em = $this->getDoctrine()->getManager();
            $em->persist($newCloth);
            $em->flush();

            // Return a json response that show to the front that the creation is successfull ( flash message )
            return new JsonResponse(array('flash' => 'Le vêtement a été ajouté avec succès !'));
        }

        // Else
        else {

            // Return a json response that show to the front that the creation was not successfull ( flash message )
            return new JsonResponse(array('flash' => 'Le vêtement n\'a pas pu être ajouté !'));
        }

    }

    /**
     * @Route("/cloth/{id}/delete", name="delete_cloth", methods={"GET"})
     */
    public function delete(Request $request, Cloth $cloth): Response {

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($cloth);
        $entityManager->flush();

        // Return a json response that show to the front that the delete is successfull OR NOT ( flash message )
        return new JsonResponse(array('flash' => 'Le vêtement a été supprimé !'));
    }

    /**
     * @Route("/cloth/random/{id}", name="random_cloths", methods={"GET", "POST"})
     */
    public function random(ClothRepository $repository, SerializerInterface $serializer, $id) {

        $cloths = $repository->findAll();
        
        $clothId = rand(1,count($cloths));
        dump($clothId);
        
        $random = [];

        // $testRand = $repository->testRand($id);
        // dd($testRand);
        
        $heads = $repository->findHeadByIdAndStyleId($id,$clothId);
        $jackets = $repository->findJacketByIdAndStyleId($id,$clothId);
        $tops = $repository->findTopByIdAndStyleId($id,$clothId); 
        $bottoms = $repository->findBottomByIdAndStyleId($id,$clothId);
        $shoes = $repository->findShoesByIdAndStyleId($id,$clothId);

        
        shuffle($heads);
        shuffle($jackets);
        shuffle($tops);
        shuffle($bottoms);
        shuffle($shoes);
        
        // Warning: array_values() expects parameter 1 to be array, boolean given
        // Notice: Undefined offset: 1
        

        
        $oneHead = array_values($heads)[1];
        $random[] = $oneHead;
        $oneJacket = array_values($jackets)[1];
        $random[] = $oneJacket;
        $oneTop = array_values($tops)[1];
        $random[] = $oneTop;
        $oneBottom = array_values($bottoms)[1];
        $random[] = $oneBottom;
        $oneShoe = array_values($shoes)[1];
        $random[] = $oneShoe; 

        dump($random);



        $json = $serializer->serialize($random, 'json');
        return JsonResponse::fromJsonString($json);

        // PLUS TARD
        // random 1 a 50, et que dans ta table il a des vetements qui sont 1 et 17 || 17 a 50 =>17, 1 a 16 => 1

        // findOneHeadbyIdByStyleId, "findOneHeadById" => idcloth => pour avoir un seul vetement
        // Le probleme c'est qu'il faut générer avec php cet idcloth random
        // ensuite il faut aller changer dans le repository le fait que ce soit une recherche = sur l'idcloth. cloth.id qui soit égale à l'idcloth, mais qui soit le plus proche
        // On genere un nombre random, entre 1 et 50. -> ce sera l'id random du vetement
        // sauf que l'aléatoire ne genere pas quelque chose qui existe forcement dans les id des vetements, et encore moins dans les id des vetements 
        // d'un type particulier, d'un style, donc ce ne sera pas un égale sur la requete SQL = <= et le premier qui trouve LIMIT 1 les resultats

        // $idcloth =34, find***ByStyle tu passes deux id: tu passes l'id du style qui est dans la route api
        // et tu passes l'id référence ( $idcloth ) qui a pour but d'etre un point de recherche pour tout les vetements trouver par style 
        // donc pas de recherche cloth.id = $idcloth mais plus une recherche du style le premier trouver ou cloth.id =< $idcloth (LIMIT 1 les resultats)

        // Pk ne pas utiliser le rand() de SQL -> il va indexé toutes tes recherches, c'est comme si qu'il allait creer une property newId ou chaque vetement en a un,
        // et apres ca il en prends un au hasard
        // quand ta 10 resultats c'est ok
        // plus t'en a plus la requete est super longue
        // temps de recherche: approx . 14secondes pour 1 requete
        // a partir de dizaine milliers d'entrées

        // soit tu fais tout dans une requete

        // Retrouver tout les vetements par style

        // Retrouver tout les vetements par type selon le style
        // On se retrouve avec 5 listes :
            // Tout les vetements de type Tete par style
            // Tout les vetements de type Veste par style
            // Tout les vetements de type Haut par style
            // Tout les vetements de type Bas par style
            // Tout les vetements de type Chaussure par style
        
        // On en pioche un au hasard dedans ( soit on fait un vrai hasard soit on shuffle les results et on prends le premier)
        // Dans chaque liste

        // On les ajoutent à notre $random[]
        // On le retourne en json

    }

    /**
     * @Route("/cloth/{id}/edit", name="edit_cloth", methods={"GET", "POST"})
     */
    public function edit(Request $request, Cloth $cloth): Response {

        $oldImage = $cloth->getImage();
        if(!empty($oldImage)) {
            $cloth->setImage(
                new File($this->getParameter('image_directory').'/'.$oldImage)
            );
        }

        // Using a symfony form
        $form = $this->createForm(ClothType::class, $cloth);

        // Retrieving data send from REACT ( don't know if we really need to decode )
        $data = json_decode($request->getContent(), true);

        // Giving the data to the form, a submission
        $form->submit($data);

        // Do we need to handle the request ?
        // $form->handleRequest($request);

        // Testing
        if ($form->isSubmitted() && $form->isValid()) {

            if(!is_null($cloth->getImage())){
                
                $file = $cloth->getImage();
            
                $fileName = $this->generateUniqueFileName().'.'.$file->guessExtension();
                try {
                    $file->move(
                        $this->getParameter('image_directory'),
                        $fileName
                    );
                } catch (FileException $e) {
                    dump($e);
                }
                
                $cloth->setImage($fileName);
                if(!empty($oldImage)){
                    unlink(
                        $this->getParameter('image_directory') .'/'.$oldImage
                    );
                }
            } else {
                
                $cloth->setImage($oldImage);
            }

            $em = $this->getDoctrine()->getManager();
            $em->persist($cloth);
            $em->flush();

            // Return a json response that show to the front that the creation is successfull ( flash message )
            return new JsonResponse(array('flash' => 'Le vêtement a été modifié avec succès !'));
        }

        // Else
        else {

            // Return a json response that show to the front that the creation was not successfull ( flash message )
            return new JsonResponse(array('flash' => 'Le vêtement n\'a pas pu être modifié !'));
        }

    }

    /**
     * @return string
     */
    private function generateUniqueFileName() {

        // md5() reduces the similarity of the file names generated by
        // uniqid(), which is based on timestamps
        return md5(uniqid());

    }
}
