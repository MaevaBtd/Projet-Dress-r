<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;


class SubscribeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', TextType::class, [
                'label' => 'Nom d\'utilisateur',
                'required' => true,
                'attr' => [
                    'placeholder' => "Entrez votre nom d'utilisateur !"
                ],
                'constraints' => [
                    new NotBlank([
                        'message' => 'le nom d\'utilisateur ne peut pas être vide'
                    ]),
                    new Length([
                        'min' => 3,
                        'max' => 64,
                        'minMessage' => "Votre nom d'utilisateur est trop court (min attendu :{{ limit }})",
                        'maxMessage' => "Voter nom d'utilisateur est trop long  (max attendu : {{ limit }})"
                    ])
                ]
            ])
            ->add('email', EmailType::class, [
                'label' => 'Email',
                'required' => true,
                'attr' => [
                    'placeholder' => "Entrez votre email !"
                ],
                'constraints' => [
                    new NotBlank([
                        'message' => 'l\'email ne peut pas être vide'
                    ]),
                    new Length([
                        'min' => 6,
                        'max' => 255,
                        'minMessage' => "Votre email est trop court (min attendu :{{ limit }})",
                        'maxMessage' => "Votre email est trop long  (max attendu : {{ limit }})"

                    ]),
                ]
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'invalid_message' => 'Les champs mot de passe doivent être identique',
                'required' => true,
                'constraints' => [
                    new NotBlank([
                        'message' => 'les champs mot de passe ne doivent pas être vide'
                    ]),
                    new Length([
                        'min' => 3,
                        'max' => 64,
                        'minMessage' => "Votre email est trop court (min attendu :{{ limit }})",
                        'maxMessage' => "Votre email est trop long  (max attendu : {{ limit }})"
                    ])
                ],
                'first_options' => [
                    'label' => 'Mot de passe',
                    'attr' => [
                        'placeholder' => 'Entez votre mot de passe'
                    ]
                ],
                'second_options' => [
                    'label' => 'Confirmez votre mot de passe',
                    'attr' => [
                        'placeholder' => 'Retapez votre mot de passe'
                    ]
                ]
            ])
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
