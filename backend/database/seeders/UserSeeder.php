<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['name' => '田中 蓮', 'email' => 'ren@example.com'],
            ['name' => '鈴木 結衣', 'email' => 'yui@example.com'],
            ['name' => '伊藤 凪',  'email' => 'nagi@example.com'],
        ];

        foreach ($users as $data) {
            User::create([
                'name'     => $data['name'],
                'email'    => $data['email'],
                'password' => Hash::make('password'),
            ]);
        }
    }
}
