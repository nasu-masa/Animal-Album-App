<?php

namespace Database\Factories;

use App\Models\Favorite;
use App\Models\Media;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Favorite>
 */
class FavoriteFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id'  => User::factory(),
            'media_id' => Media::factory(),
        ];
    }
}
