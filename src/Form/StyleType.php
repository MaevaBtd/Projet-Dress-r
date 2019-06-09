<?php

namespace App\Form;

use App\Entity\Style;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class StyleType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('name',TextType::class,[
            'label' => 'Nom du style',
            'attr' => [
                'placeholder' => "Entrez le nom du style !"
            ]
        ],[
            'constraints' => [
                new NotBlank([
                    'message'=>'Le nom du style ne peut pas être vide'
                ]),
                new Length([
                    'min' => 3,
                    'max' => 64,
                    'minMessage' => "Votre nom de style est trop court ",
                    'maxMessage' => "Voter nom de style est trop long  "
                ]),

            ],
                'required'=> true
        
        ]);
   
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Style::class,
        ]);
    }
}
