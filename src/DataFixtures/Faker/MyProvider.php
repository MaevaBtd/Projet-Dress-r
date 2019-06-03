<?php

namespace App\DataFixtures\Faker;

use Faker\Provider\Base;

class MyProvider extends Base
{

    protected static $cloths = [

        'Veste',
        'pantalon',
        'pull',
        'chemise',
        'jupe',
        'chemisier',
        'gilet',
        'sweat',
        'T-shirts',
        'manteau',
        'jean',
        'leggin',
        'collants',
        'short',
        'débardeur',
        'bottines',
        'basket',
        'bottes',
        'runnings',
        'talon',
        'escarpins',
        'casquette',
        'bonnet',
        'chapeau de paille',
        'chapeau melon',
        'bandana',
        'haut de forme',
        'béret',
        'bob'


    ];

    protected static $styles = [

        'soirée',
        'hiver',
        'cozy ',
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
        'glamour',
        'décalé'

    ];

    protected static $types = [
        'tête',
        'haut',
        'bas',
        'chaussures'
    ];

    protected static $pass = [
        'pass'
    ];

    protected static $imageCloths = [
        'https://www.apc.fr/media/catalog/product/cache/1/thumbnail/632x733/9df78eab33525d08d6e5fb8d27136e95/apc/imedia/ACAAT-F08302_IAK_00.jpg',
        'https://www.apc.fr/media/catalog/product/cache/1/thumbnail/632x733/9df78eab33525d08d6e5fb8d27136e95/apc/imedia/VIAGL-F08300_IAJ_00.jpg',
        'https://www.apc.fr/media/catalog/product/cache/1/thumbnail/632x733/9df78eab33525d08d6e5fb8d27136e95/apc/imedia/CODAY-F27519_GAC_00.jpg',
        'https://www.apc.fr/media/catalog/product/cache/1/thumbnail/632x733/9df78eab33525d08d6e5fb8d27136e95/apc/imedia/LYAAM-F26604_LZZ_00.jpg',
        'https://www.apc.fr/media/catalog/product/cache/1/thumbnail/632x733/9df78eab33525d08d6e5fb8d27136e95/apc/imedia/CODAO-F13274_SAA_00.jpg',
        'https://www.apc.fr/media/catalog/product/cache/1/thumbnail/632x733/9df78eab33525d08d6e5fb8d27136e95/apc/imedia/COCUK-F13290_AAC_00.jpg',
        'https://www.apc.fr/media/catalog/product/cache/1/thumbnail/632x733/9df78eab33525d08d6e5fb8d27136e95/apc/imedia/WOAIZ-F01375_PIA_00.jpg'
    ];


    public static function cloths()
    {
        return static::randomElement(self::$cloths);
    }


    public static function types()
    {
        return static::randomElement(self::$types);
    }


    public static function styles()
    {
        return static::randomElement(self::$styles);
    }

    public static function pass()
    {
        return static::randomElement(self::$pass);
    }

    public static function imageCloths()
    {
        return static::randomElement(self::$imageCloths);
    }
}
