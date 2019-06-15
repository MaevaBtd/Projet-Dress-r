<?php

namespace App\Repository;

use App\Entity\Cloth;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Cloth|null find($id, $lockMode = null, $lockVersion = null)
 * @method Cloth|null findOneBy(array $criteria, array $orderBy = null)
 * @method Cloth[]    findAll()
 * @method Cloth[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ClothRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Cloth::class);
    }


    // retourne un vêtement filtré par l'id

    public function findById($id) {

        return $this->createQueryBuilder('c')
            ->andWhere('c.id = :val')
            ->setParameter('val', $id)
            ->getQuery()
            ->getResult()
            ;
    }

    public function findOneByUserId ($clothName, $userId) {

        return $this->createQueryBuilder('c')
        ->select('c.name')
        ->join('c.user', 'u')
        ->addSelect('u.id')
        ->andWhere('c.name = :clothName')
        ->setParameter('clothName', $clothName)
        ->andWhere('u.id = :userId')
        ->setParameter('userId', $userId)

        ->getQuery()->getResult();
    }

    public function findHeadByIdAndStyleId($styleId,$clothId){
        
        return $this->createQueryBuilder('c')
        ->select('c.id','c.name','c.image')
        ->join('c.styles', 's')
        ->join('c.type', 't')
        ->addSelect('s.id AS style_id','s.name AS style_name')
        ->andWhere('t.id = 1')
        ->andWhere('s.id = :styleId')
        ->setParameter('styleId', $styleId)
        ->andWhere('c.id <> :clothId')
        ->setParameter('clothId', $clothId)
        
        
       
        ->getQuery()->getResult();
    }
   
    public function findJacketByIdAndStyleId($styleId,$clothId){

        return $this->createQueryBuilder('c')
        ->select('c.id','c.name','c.image')
        ->join('c.styles', 's')
        ->join('c.type', 't')
        ->addSelect('s.id AS style_id','s.name AS style_name')
        ->andWhere('t.id = 2')
        ->andWhere('s.id = :styleId')
        ->setParameter('styleId', $styleId)
        ->andWhere('c.id <> :clothId')
        ->setParameter('clothId', $clothId)
       
       
        ->getQuery()->getResult();
    }
    public function findTopByIdAndStyleId($styleId,$clothId){

        return $this->createQueryBuilder('c')
        ->select('c.id','c.name','c.image')
        ->join('c.styles', 's')
        ->join('c.type', 't')
        ->addSelect('s.id AS style_id','s.name AS style_name')
        ->andWhere('t.id = 3')
        ->andWhere('s.id = :styleId')
        ->setParameter('styleId', $styleId)
        ->andWhere('c.id <> :clothId')
        ->setParameter('clothId', $clothId)
       
        ->getQuery()->getResult();
    }
   
    public function findBottomByIdAndStyleId($styleId, $clothId){

        return $this->createQueryBuilder('c')
        ->select('c.id','c.name','c.image')
        ->join('c.styles', 's')
        ->join('c.type', 't')
        ->addSelect('s.id AS style_id','s.name AS style_name')
        ->andWhere('t.id = 4')
        ->andWhere('s.id = :styleId')
        ->setParameter('styleId', $styleId)
        ->andWhere('c.id <> :clothId')
        ->setParameter('clothId', $clothId)
       
        ->getQuery()->getResult();
    }

    public function findShoesByIdAndStyleId($styleId, $clothId){
        
        return $this->createQueryBuilder('c')
        ->select('c.id','c.name','c.image')
        ->join('c.styles', 's')
        ->join('c.type', 't')
        ->addSelect('s.id AS style_id','s.name AS style_name')
        ->andWhere('t.id = 5')
        ->andWhere('s.id = :styleId')
        ->setParameter('styleId', $styleId)
        ->andWhere('c.id <> :clothId')
        ->setParameter('clothId', $clothId)

       
        ->getQuery()->getResult();
    }

    // // Recuperer les cloths d'un type donné
    // public function findByTypeAndStyleDQL() {

    //     // $parameters = array(
    //     //     'type' => 'pantalon',
    //     //     'style' => 'printemps'
    //     // );

    //     $query = $this->getEntityManager()->createQuery('
    //         SELECT c
    //         FROM App\Entity\Cloth c
    //     ');
    //     // ->setParameter($parameters);

    //     return $query->getResult();

    // }


    // /**
    //  * @return Cloth[] Returns an array of Cloth objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Cloth
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
