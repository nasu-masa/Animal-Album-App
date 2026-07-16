<?php

namespace Database\Seeders;

use App\Models\Favorite;
use App\Models\Media;
use App\Models\User;
use Illuminate\Database\Seeder;

class FavoriteSeeder extends Seeder
{
    public function run(): void
    {
        $demoUser = User::where('email', 'demo@example.com')->firstOrFail();

        $favoriteFilePaths = [
            'media/seed/images/turtle_small.jpg',
            'media/seed/images/hamster_eating.jpg',
            'media/seed/images/Lizard_Sleeping_In_Terrarium.jpg',
            'media/seed/videos/cat_relaxing.mp4',
        ];

        foreach ($favoriteFilePaths as $filePath) {
            $media = Media::where('file_path', $filePath)->firstOrFail();

            Favorite::create([
                'user_id'  => $demoUser->id,
                'media_id' => $media->id,
            ]);
        }
    }
}
