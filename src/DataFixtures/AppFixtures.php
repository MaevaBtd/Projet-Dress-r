<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Role;
use App\Entity\Type;
use App\Entity\User;
use App\Entity\Cloth;
use App\Entity\Style;
use Faker\ORM\Doctrine\Populator;
use App\DataFixtures\Faker\DressrProvider;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\Outfit;

class AppFixtures extends Fixture
{
  
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $styles = [

            'soirée',
            'hypster',
            'hiver',
            'cozy',
            'automne',
            'printemps',
            'été',
            'plage',
            'maison',
            'sortie',
            'tendance',
            'bohème',
            'chic',
            'sport',
            'flemme',
            'classique',
            'casual',
            'classe',
            'montagne',
    
        ];

        $types = [
            'tête',
            'haut',
            'veste',
            'bas',
            'chaussures'
        ];
        
        
        
        $roleUser = new Role();
        $roleUser->setCode('ROLE_USER');
        $roleUser->setName('Utilisateur');

        $roleAdmin = new Role();
        $roleAdmin->setCode('ROLE_ADMIN');
        $roleAdmin->setName('Administrateur');

        $admin = new User();
        $admin->setUsername('admin');
        $encodedPassword = $this->encoder->encodePassword($admin, 'admin');
        $admin->setPassword($encodedPassword);
        $admin->setEmail('admin@admin.admin');
        $admin->setRole($roleAdmin);
        $admin->setNbRandom(0);

        $user = new User();
        $user->setUsername('user');
        $encodedPassword = $this->encoder->encodePassword($user, 'user');
        $user->setPassword($encodedPassword);
        $user->setEmail('user@user.user');
        $user->setRole($roleUser);
        $user->setNbRandom(0);

        
        foreach($styles as $style){
        
            $newStyle = new Style();
            $newStyle->setName($style);
            $manager->persist($newStyle);

        }
        foreach($types as $type){
        
            $newType = new Type();
            $newType->setName($type);
            $manager->persist($newType);
                
        }
        $manager->persist($roleAdmin);
        $manager->persist($roleUser);
        
        $manager->persist($user);
        $manager->persist($admin);

        $manager->flush();

    }
}