<?php

namespace App\Form;

use App\Entity\User;
use App\Form\ApplicationType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;

class UserType extends ApplicationType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', TextType::class, $this->getConfiguration("Username", "Entrez votre nom d'utilisateur "),[
                'constraints'=> [
                    new NotBlank()
                ]
            ])
            ->add('email', EmailType::class, $this->getConfiguration("Email", "Entrez votre email"),[
                'constraints' => [
                    new NotBlank()
                ]
            ])
            ->add('password', RepeatedType::class,[
                'type'=> PasswordType::class,
                'invalid_message'=>'Les champs mot de passe doivent être identique',
                'first_options'=>[
                    'label'=>'Mot de passe'
                ],
                'second_options'=>[
                    'label'=>'Confirmez votre mot de passe'
                ]
            ]);
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'attr' => ['novalidate' => 'novalidate'],
        ]);
    }
}


