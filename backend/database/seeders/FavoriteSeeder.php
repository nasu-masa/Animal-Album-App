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
        $users  = User::all()->values();
        $medias = Media::all()->values();

        // unique(user_id, media_id) 制約に違反しないよう、組み合わせを明示
        $records = [
            ['user_id' => $users[0]->id, 'media_id' => $medias[2]->id],
            ['user_id' => $users[0]->id, 'media_id' => $medias[4]->id],
            ['user_id' => $users[1]->id, 'media_id' => $medias[0]->id],
            ['user_id' => $users[2]->id, 'media_id' => $medias[0]->id],
            ['user_id' => $users[2]->id, 'media_id' => $medias[2]->id],
        ];

        foreach ($records as $data) {
            Favorite::create($data);
        }
    }
}
