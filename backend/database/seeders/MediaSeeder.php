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
        $demoUser   = User::where('email', 'demo@example.com')->firstOrFail();
        $otherUser  = User::where('email', 'ren@example.com')->firstOrFail();
        $aoiUser    = User::where('email', 'aoi@example.com')->firstOrFail();
        $minatoUser = User::where('email', 'minato@example.com')->firstOrFail();
        $rinUser    = User::where('email', 'rin@example.com')->firstOrFail();

        $seedFiles = [
            'images/cat_sitting.jpg',
            'images/dog_running.jpg',
            'images/dog_sleeping.jpg',
            'images/rabbit_eating.jpg',
            'images/Budgerigar_Tilting_Its_Head.jpg',
            'images/Chinchilla_Posing_With_One_Paw_Up.jpg',
            'images/Frog_Calling.jpg',
            'images/Gecko_Calling_On_Wall.jpg',
            'images/Java_Sparrow_Playing_In_Its_Cage.jpg',
            'images/Lizard_Sleeping_In_Terrarium.jpg',
            'images/Salamander_Stalking_Prey.jpg',
            'images/Snake_Climbing_A_Tree.jpg',
            'images/betta_two_swimming.jpg',
            'images/cockatiel_flying.jpg',
            'images/degu_eating_leaf.jpg',
            'images/goldfish_blowing_bubbles_in_tank.jpg',
            'images/guinea_pig_eating.jpg',
            'images/guppy_single_swimming.jpg',
            'images/hamster_eating.jpg',
            'images/lovebird_eating.jpg',
            'images/parrots_cuddling.jpg',
            'images/tropicalfish_right_facing.jpg',
            'images/turtle_small.jpg',
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
            [
                'user_id'   => $aoiUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/Budgerigar_Tilting_Its_Head.jpg',
                'category'  => 'budgerigar',
                'taken_at'  => '2024-08-01 09:00:00',
                'memo'      => '首をかしげるセキセイインコ',
            ],
            [
                'user_id'   => $aoiUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/Chinchilla_Posing_With_One_Paw_Up.jpg',
                'category'  => 'chinchilla',
                'taken_at'  => '2024-08-05 10:30:00',
                'memo'      => '片足を上げてポーズをとるチンチラ',
            ],
            [
                'user_id'   => $aoiUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/Frog_Calling.jpg',
                'category'  => 'frog',
                'taken_at'  => '2024-08-10 18:00:00',
                'memo'      => '鳴いているカエル',
            ],
            [
                'user_id'   => $aoiUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/Gecko_Calling_On_Wall.jpg',
                'category'  => 'gecko',
                'taken_at'  => '2024-08-15 20:00:00',
                'memo'      => '壁に張り付いて鳴くヤモリ',
            ],
            [
                'user_id'   => $aoiUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/Java_Sparrow_Playing_In_Its_Cage.jpg',
                'category'  => 'java_sparrow',
                'taken_at'  => '2024-08-20 11:00:00',
                'memo'      => 'ケージの中で遊ぶ文鳥',
            ],
            [
                'user_id'   => $aoiUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/Lizard_Sleeping_In_Terrarium.jpg',
                'category'  => 'lizard',
                'taken_at'  => '2024-08-25 13:00:00',
                'memo'      => 'テラリウムの中で眠るトカゲ',
            ],
            [
                'user_id'   => $aoiUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/Salamander_Stalking_Prey.jpg',
                'category'  => 'salamander',
                'taken_at'  => '2024-08-30 16:00:00',
                'memo'      => '獲物を狙うサンショウウオ',
            ],
            [
                'user_id'   => $minatoUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/Snake_Climbing_A_Tree.jpg',
                'category'  => 'snake',
                'taken_at'  => '2024-09-03 12:00:00',
                'memo'      => '木に登るヘビ',
            ],
            [
                'user_id'   => $minatoUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/betta_two_swimming.jpg',
                'category'  => 'betta',
                'taken_at'  => '2024-09-08 14:30:00',
                'memo'      => '一緒に泳ぐ2匹のベタ',
            ],
            [
                'user_id'   => $minatoUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/cockatiel_flying.jpg',
                'category'  => 'cockatiel',
                'taken_at'  => '2024-09-13 10:00:00',
                'memo'      => '空を飛ぶオカメインコ',
            ],
            [
                'user_id'   => $minatoUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/degu_eating_leaf.jpg',
                'category'  => 'degu',
                'taken_at'  => '2024-09-18 15:00:00',
                'memo'      => '葉を食べるデグー',
            ],
            [
                'user_id'   => $minatoUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/goldfish_blowing_bubbles_in_tank.jpg',
                'category'  => 'goldfish',
                'taken_at'  => '2024-09-23 17:00:00',
                'memo'      => '水槽の中で泡を吹く金魚',
            ],
            [
                'user_id'   => $minatoUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/guinea_pig_eating.jpg',
                'category'  => 'guinea_pig',
                'taken_at'  => '2024-09-28 09:30:00',
                'memo'      => 'ごはんを食べるモルモット',
            ],
            [
                'user_id'   => $rinUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/guppy_single_swimming.jpg',
                'category'  => 'guppy',
                'taken_at'  => '2024-10-02 11:30:00',
                'memo'      => 'ひとりで泳ぐグッピー',
            ],
            [
                'user_id'   => $rinUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/hamster_eating.jpg',
                'category'  => 'hamster',
                'taken_at'  => '2024-10-07 13:30:00',
                'memo'      => 'ごはんを食べるハムスター',
            ],
            [
                'user_id'   => $rinUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/lovebird_eating.jpg',
                'category'  => 'lovebird',
                'taken_at'  => '2024-10-12 08:30:00',
                'memo'      => 'ごはんを食べるコザクラインコ',
            ],
            [
                'user_id'   => $rinUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/parrots_cuddling.jpg',
                'category'  => 'parrot',
                'taken_at'  => '2024-10-17 14:00:00',
                'memo'      => '寄り添うインコたち',
            ],
            [
                'user_id'   => $rinUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/tropicalfish_right_facing.jpg',
                'category'  => 'tropical_fish',
                'taken_at'  => '2024-10-22 16:30:00',
                'memo'      => '右を向いて泳ぐ熱帯魚',
            ],
            [
                'user_id'   => $rinUser->id,
                'type'      => 'image',
                'file_path' => 'media/seed/images/turtle_small.jpg',
                'category'  => 'turtle',
                'taken_at'  => '2024-10-27 12:30:00',
                'memo'      => '小さなカメ',
            ],
        ];

        foreach ($records as $data) {
            Media::create($data);
        }
    }
}
