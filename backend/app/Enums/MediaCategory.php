<?php

namespace App\Enums;

enum MediaCategory: string
{
    case Cat          = 'cat';
    case Dog          = 'dog';
    case Rabbit       = 'rabbit';
    case Hamster      = 'hamster';
    case GuineaPig    = 'guinea_pig';
    case Chinchilla   = 'chinchilla';
    case Degu         = 'degu';
    case Mouse        = 'mouse';
    case Rat          = 'rat';
    case Rodent       = 'rodent';
    case Primate      = 'primate';
    case Mammal       = 'mammal';
    case Budgerigar   = 'budgerigar';
    case Cockatiel    = 'cockatiel';
    case Lovebird     = 'lovebird';
    case JavaSparrow  = 'java_sparrow';
    case Canary       = 'canary';
    case Parrot       = 'parrot';
    case Bird         = 'bird';
    case Goldfish     = 'goldfish';
    case Medaka       = 'medaka';
    case Betta        = 'betta';
    case Guppy        = 'guppy';
    case Koi          = 'koi';
    case TropicalFish = 'tropical_fish';
    case Fish         = 'fish';
    case Turtle       = 'turtle';
    case Lizard       = 'lizard';
    case Snake        = 'snake';
    case Gecko        = 'gecko';
    case Reptile      = 'reptile';
    case Frog         = 'frog';
    case Newt         = 'newt';
    case Salamander   = 'salamander';
    case Amphibian    = 'amphibian';
    case Other        = 'other';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
