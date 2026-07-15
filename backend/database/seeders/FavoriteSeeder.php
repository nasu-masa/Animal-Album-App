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
        $otherUserMedia = Media::where(
            'file_path',
            'media/seed/images/dog_running.jpg',
        )->firstOrFail();

        Favorite::create([
            'user_id'  => $demoUser->id,
            'media_id' => $otherUserMedia->id,
        ]);
    }
}
