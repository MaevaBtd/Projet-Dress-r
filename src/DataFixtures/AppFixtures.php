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
        
        $generator = Factory::create('fr_FR');
        $populator = new Populator($generator, $manager);

        $generator->addProvider(new DressrProvider($generator));

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

        $user = new User();
        $user->setUsername('user');
        $encodedPassword = $this->encoder->encodePassword($user, 'user');
        $user->setPassword($encodedPassword);
        $user->setEmail('user@user.user');
        $user->setRole($roleUser);

        
           
        $manager->persist($roleAdmin);
        $manager->persist($roleUser);
        
        $manager->persist($user);
        $manager->persist($admin);


    

        $populator->addEntity(Type::class, 5, array(
            'name' => function () use ($generator) {
                return $generator->types();
            }
        ));

        $populator->addEntity(Style::class, 10, array(
            'name' => function () use ($generator) {
                return $generator->styles();
            }
        ));
        
        $populator->addEntity(Cloth::class, 20, array(
            'name' => function () use ($generator) {
                return $generator->cloths();
            },
            'image' => function () use ($generator) {
                return $generator->imageCloths();
            }
        ));

        $populator->addEntity(Outfit::class, 4, array(
            'name' => function () use ($generator) {
                return $generator->outfits();
            }
        ));

        $insertedEntities = $populator->execute();
        
        $cloths = $insertedEntities['App\Entity\Cloth'];
        $styles = $insertedEntities['App\Entity\Style'];
        $outfits = $insertedEntities['App\Entity\Outfit'];
        

        foreach ($cloths as $cloth) {
            shuffle($styles);
            $cloth->addStyle($styles[0]);
            $cloth->addStyle($styles[1]);
            $cloth->setUser($user);

            $manager->persist($cloth);
        }

        foreach ($outfits as $outfit) {
            shuffle($cloths);
            $outfit->addCloth($cloths[0]);
            $outfit->addCloth($cloths[1]);
            $outfit->addCloth($cloths[2]);
            $outfit->addCloth($cloths[3]);
            $outfit->addCloth($cloths[4]);
            $outfit->setUser($user);

            $manager->persist($outfit);
        }
        $manager->flush();

    }
}