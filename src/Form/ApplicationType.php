<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;

// Permet de ne pas dupliquer du code 

class ApplicationType extends AbstractType
{

    /**
     * Permet de configurer un champs
     *
     * @param string $label
     * @param string $placeholder
     * @return array
     */
    protected function getConfiguration($label, $placeholder)
    {

        return [
            'label' => $label,
            'attr' => [
                'placeholder' => $placeholder
            ],

        ];
    }
}
