<?php

namespace Database\Factories;

use App\Enums\MediaCategory;
use App\Models\Media;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Media>
 */
class MediaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id'   => User::factory(),
            'type'      => 'image',
            'file_path' => 'media/testing/'.Str::uuid().'.jpg',
            'category'  => fake()->randomElement(MediaCategory::values()),
            'taken_at'  => fake()->optional()->dateTimeBetween('-1 year', 'now'),
            'memo'      => fake()->optional()->sentence(),
        ];
    }

    public function video(): static
    {
        return $this->state(fn (array $attributes) => [
            'type'      => 'video',
            'file_path' => 'media/testing/'.Str::uuid().'.mp4',
        ]);
    }
}
