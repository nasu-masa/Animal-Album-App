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
            [
                'name'     => 'Demo User',
                'email'    => 'demo@example.com',
                'password' => 'demo1234',
            ],
            [
                'name'     => '田中 蓮',
                'email'    => 'ren@example.com',
                'password' => 'password',
            ],
            [
                'name'     => '佐藤 葵',
                'email'    => 'aoi@example.com',
                'password' => 'password',
            ],
            [
                'name'     => '鈴木 湊',
                'email'    => 'minato@example.com',
                'password' => 'password',
            ],
            [
                'name'     => '高橋 凛',
                'email'    => 'rin@example.com',
                'password' => 'password',
            ],
        ];

        foreach ($users as $data) {
            User::create([
                'name'     => $data['name'],
                'email'    => $data['email'],
                'password' => Hash::make($data['password']),
            ]);
        }
    }
}
