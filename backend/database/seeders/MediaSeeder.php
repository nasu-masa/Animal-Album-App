<?php

namespace Database\Seeders;

use App\Models\Media;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class MediaSeeder extends Seeder
{
    public function run(): void
    {
        $demoUser  = User::where('email', 'demo@example.com')->firstOrFail();
        $otherUser = User::where('email', 'ren@example.com')->firstOrFail();

        $seedFiles = [
            'images/cat_sitting.jpg',
            'images/dog_running.jpg',
            'images/dog_sleeping.jpg',
            'images/rabbit_eating.jpg',
            'videos/cat_being_petted.mp4',
            'videos/cat_relaxing.mp4',
        ];

        foreach ($seedFiles as $relativePath) {
            $sourcePath = database_path("seeders/assets/media/{$relativePath}");

            if (! File::isFile($sourcePath)) {
                throw new RuntimeException("Seeder用メディアが見つかりません: {$sourcePath}");
            }
        }

        foreach ($seedFiles as $relativePath) {
            $sourcePath = database_path("seeders/assets/media/{$relativePath}");

            Storage::disk('public')->put(
                "media/seed/{$relativePath}",
                File::get($sourcePath),
            );
        }

        $records = [
            [
                'user_id'   => $demoUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/cat_sitting.jpg',
                'category'  => 'cat',
                'taken_at'  => '2024-03-15 10:30:00',
                'memo'      => '窓際で日向ぼっこしているところ',
            ],
            [
                'user_id'   => $demoUser->id,
                'type'      => 'video',
                'file_path' => 'media/seed/videos/cat_being_petted.mp4',
                'category'  => 'cat',
                'taken_at'  => '2024-04-01 15:00:00',
                'memo'      => 'まどろんでいる猫',
            ],
            [
                'user_id'   => $otherUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/dog_running.jpg',
                'category'  => 'dog',
                'taken_at'  => '2024-05-20 09:00:00',
                'memo'      => '公園での散歩中に撮影',
            ],
            [
                'user_id'   => $otherUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/dog_sleeping.jpg',
                'category'  => 'dog',
                'taken_at'  => null,
                'memo'      => null,
            ],
            [
                'user_id'   => $otherUser->id,
                'type'      => 'video',
                'file_path' => 'media/seed/videos/cat_relaxing.mp4',
                'category'  => 'cat',
                'taken_at'  => '2024-06-10 07:30:00',
                'memo'      => 'くつろいでいる猫',
            ],
            [
                'user_id'   => $otherUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/rabbit_eating.jpg',
                'category'  => 'rabbit',
                'taken_at'  => '2024-07-04 14:00:00',
                'memo'      => null,
            ],
        ];

        foreach ($records as $data) {
            Media::create($data);
        }
    }
}
