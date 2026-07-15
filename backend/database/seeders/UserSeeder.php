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
