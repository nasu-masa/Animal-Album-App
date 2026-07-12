<?php

namespace Database\Seeders;

use App\Models\Media;
use App\Models\User;
use Illuminate\Database\Seeder;

class MediaSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all()->values();

        $records = [
            [
                'user_id'   => $users[0]->id,
                'type'      => 'image',
                'file_path' => 'media/images/cat_sitting.jpg',
                'category'  => 'cat',
                'taken_at'  => '2024-03-15 10:30:00',
                'memo'      => '窓際で日向ぼっこしているところ',
            ],
            [
                'user_id'   => $users[0]->id,
                'type'      => 'video',
                'file_path' => 'media/videos/cat_playing.mp4',
                'category'  => 'cat',
                'taken_at'  => '2024-04-01 15:00:00',
                'memo'      => null,
            ],
            [
                'user_id'   => $users[1]->id,
                'type'      => 'image',
                'file_path' => 'media/images/dog_running.jpg',
                'category'  => 'dog',
                'taken_at'  => '2024-05-20 09:00:00',
                'memo'      => '公園での散歩中に撮影',
            ],
            [
                'user_id'   => $users[1]->id,
                'type'      => 'image',
                'file_path' => 'media/images/dog_sleeping.jpg',
                'category'  => 'dog',
                'taken_at'  => null,
                'memo'      => null,
            ],
            [
                'user_id'   => $users[2]->id,
                'type'      => 'video',
                'file_path' => 'media/videos/bird_singing.mp4',
                'category'  => 'bird',
                'taken_at'  => '2024-06-10 07:30:00',
                'memo'      => '朝に庭で鳴いていた',
            ],
            [
                'user_id'   => $users[2]->id,
                'type'      => 'image',
                'file_path' => 'media/images/rabbit_eating.jpg',
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
