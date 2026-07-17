<?php

namespace Database\Seeders;

use App\Models\Favorite;
use App\Models\Media;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class RenderDemoSeeder extends Seeder
{
    public function run(): void
    {
        if (! config('demo.enabled')) {
            return;
        }

        $name = config('demo.user_name');
        $email = config('demo.user_email');
        $password = config('demo.user_password');

        if (! is_string($name) || $name === ''
            || ! is_string($email) || $email === ''
            || ! is_string($password) || $password === '') {
            throw new RuntimeException('公開デモ用ユーザーの認証情報が設定されていません。');
        }

        DB::transaction(function () use ($name, $email, $password): void {
            $user = User::updateOrCreate(
                ['email' => $email],
                [
                    'name' => $name,
                    'password' => Hash::make($password),
                ],
            );

            $records = [
                ['type' => 'image', 'file_path' => 'media/seed/images/cat_sitting.jpg', 'category' => 'cat', 'taken_at' => '2024-03-15 10:30:00', 'memo' => '窓際で日向ぼっこしているところ'],
                ['type' => 'video', 'file_path' => 'media/seed/videos/cat_being_petted.mp4', 'category' => 'cat', 'taken_at' => '2024-04-01 15:00:00', 'memo' => 'まどろんでいる猫'],
                ['type' => 'image', 'file_path' => 'media/seed/images/dog_running.jpg', 'category' => 'dog', 'taken_at' => '2024-05-20 09:00:00', 'memo' => '公園での散歩中に撮影'],
                ['type' => 'image', 'file_path' => 'media/seed/images/dog_sleeping.jpg', 'category' => 'dog', 'taken_at' => null, 'memo' => null],
                ['type' => 'video', 'file_path' => 'media/seed/videos/cat_relaxing.mp4', 'category' => 'cat', 'taken_at' => '2024-06-10 07:30:00', 'memo' => 'くつろいでいる猫'],
                ['type' => 'image', 'file_path' => 'media/seed/images/rabbit_eating.jpg', 'category' => 'rabbit', 'taken_at' => '2024-07-04 14:00:00', 'memo' => null],
                ['type' => 'image', 'file_path' => 'media/seed/images/Budgerigar_Tilting_Its_Head.jpg', 'category' => 'budgerigar', 'taken_at' => '2024-08-01 09:00:00', 'memo' => '首をかしげるセキセイインコ'],
                ['type' => 'image', 'file_path' => 'media/seed/images/Chinchilla_Posing_With_One_Paw_Up.jpg', 'category' => 'chinchilla', 'taken_at' => '2024-08-05 10:30:00', 'memo' => '片足を上げてポーズをとるチンチラ'],
                ['type' => 'image', 'file_path' => 'media/seed/images/Frog_Calling.jpg', 'category' => 'frog', 'taken_at' => '2024-08-10 18:00:00', 'memo' => '鳴いているカエル'],
                ['type' => 'image', 'file_path' => 'media/seed/images/Gecko_Calling_On_Wall.jpg', 'category' => 'gecko', 'taken_at' => '2024-08-15 20:00:00', 'memo' => '壁に張り付いて鳴くヤモリ'],
                ['type' => 'image', 'file_path' => 'media/seed/images/Java_Sparrow_Playing_In_Its_Cage.jpg', 'category' => 'java_sparrow', 'taken_at' => '2024-08-20 11:00:00', 'memo' => 'ケージの中で遊ぶ文鳥'],
                ['type' => 'image', 'file_path' => 'media/seed/images/Lizard_Sleeping_In_Terrarium.jpg', 'category' => 'lizard', 'taken_at' => '2024-08-25 13:00:00', 'memo' => 'テラリウムの中で眠るトカゲ'],
                ['type' => 'image', 'file_path' => 'media/seed/images/Salamander_Stalking_Prey.jpg', 'category' => 'salamander', 'taken_at' => '2024-08-30 16:00:00', 'memo' => '獲物を狙うサンショウウオ'],
                ['type' => 'image', 'file_path' => 'media/seed/images/Snake_Climbing_A_Tree.jpg', 'category' => 'snake', 'taken_at' => '2024-09-03 12:00:00', 'memo' => '木に登るヘビ'],
                ['type' => 'image', 'file_path' => 'media/seed/images/betta_two_swimming.jpg', 'category' => 'betta', 'taken_at' => '2024-09-08 14:30:00', 'memo' => '一緒に泳ぐ2匹のベタ'],
                ['type' => 'image', 'file_path' => 'media/seed/images/cockatiel_flying.jpg', 'category' => 'cockatiel', 'taken_at' => '2024-09-13 10:00:00', 'memo' => '空を飛ぶオカメインコ'],
                ['type' => 'image', 'file_path' => 'media/seed/images/degu_eating_leaf.jpg', 'category' => 'degu', 'taken_at' => '2024-09-18 15:00:00', 'memo' => '葉を食べるデグー'],
                ['type' => 'image', 'file_path' => 'media/seed/images/goldfish_blowing_bubbles_in_tank.jpg', 'category' => 'goldfish', 'taken_at' => '2024-09-23 17:00:00', 'memo' => '水槽の中で泡を吹く金魚'],
                ['type' => 'image', 'file_path' => 'media/seed/images/guinea_pig_eating.jpg', 'category' => 'guinea_pig', 'taken_at' => '2024-09-28 09:30:00', 'memo' => 'ごはんを食べるモルモット'],
                ['type' => 'image', 'file_path' => 'media/seed/images/guppy_single_swimming.jpg', 'category' => 'guppy', 'taken_at' => '2024-10-02 11:30:00', 'memo' => 'ひとりで泳ぐグッピー'],
                ['type' => 'image', 'file_path' => 'media/seed/images/hamster_eating.jpg', 'category' => 'hamster', 'taken_at' => '2024-10-07 13:30:00', 'memo' => 'ごはんを食べるハムスター'],
                ['type' => 'image', 'file_path' => 'media/seed/images/lovebird_eating.jpg', 'category' => 'lovebird', 'taken_at' => '2024-10-12 08:30:00', 'memo' => 'ごはんを食べるコザクラインコ'],
                ['type' => 'image', 'file_path' => 'media/seed/images/parrots_cuddling.jpg', 'category' => 'parrot', 'taken_at' => '2024-10-17 14:00:00', 'memo' => '寄り添うインコたち'],
                ['type' => 'image', 'file_path' => 'media/seed/images/tropicalfish_right_facing.jpg', 'category' => 'tropical_fish', 'taken_at' => '2024-10-22 16:30:00', 'memo' => '右を向いて泳ぐ熱帯魚'],
                ['type' => 'image', 'file_path' => 'media/seed/images/turtle_small.jpg', 'category' => 'turtle', 'taken_at' => '2024-10-27 12:30:00', 'memo' => '小さなカメ'],
            ];

            foreach ($records as $data) {
                $relativePath = $data['file_path'];
                $assetPath = substr($relativePath, strlen('media/seed/'));
                $sourcePath = database_path('seeders/assets/media/'.$assetPath);

                if (! File::isFile($sourcePath)) {
                    throw new RuntimeException("Seeder用メディアが見つかりません: {$sourcePath}");
                }

                Media::withTrashed()->updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'file_path' => $relativePath,
                    ],
                    [
                        'type' => $data['type'],
                        'category' => $data['category'],
                        'taken_at' => $data['taken_at'],
                        'memo' => $data['memo'],
                        'deleted_at' => null,
                    ],
                );
            }

            $favoriteFilePaths = [
                'media/seed/images/turtle_small.jpg',
                'media/seed/images/hamster_eating.jpg',
                'media/seed/images/Lizard_Sleeping_In_Terrarium.jpg',
                'media/seed/videos/cat_relaxing.mp4',
            ];

            foreach ($favoriteFilePaths as $filePath) {
                $media = Media::where('user_id', $user->id)
                    ->where('file_path', $filePath)
                    ->firstOrFail();

                Favorite::firstOrCreate([
                    'user_id' => $user->id,
                    'media_id' => $media->id,
                ]);
            }
        });
    }
}
