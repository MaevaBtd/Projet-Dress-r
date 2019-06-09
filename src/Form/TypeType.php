<?php

namespace App\Form;

use App\Entity\Type;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class TypeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('name',TextType::class,[
            'label' => 'Nom du type',
            'attr' => [
                'placeholder' => "Entrez le nom du type !"
            ]
        ],[
            'constraints' => [
                new NotBlank([
                    'message'=>'Le nom du type ne peut pas être vide'
                ]),
                new Length([
                    'min' => 3,
                    'max' => 64,
                    'minMessage' => "Votre nom de type est trop court ",
                    'maxMessage' => "Voter nom de type est trop long  "
                ]),

            ],
                'required'=> true
        
        ]);
    }
    

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Type::class,
            
        ]);
    }
}
