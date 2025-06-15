<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        $agents = [
            [
                'name' => 'Agent Jakarta',
                'email' => 'agent.jakarta@example.com',
                'agent_code' => 'AGT001',
                'phone' => '081234567890',
                'address' => 'Jl. Sudirman No. 1, Jakarta',
                'balance' => 1000000,
                'status' => 'active',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Agent Bandung',
                'email' => 'agent.bandung@example.com',
                'agent_code' => 'AGT002',
                'phone' => '081234567891',
                'address' => 'Jl. Asia Afrika No. 2, Bandung',
                'balance' => 750000,
                'status' => 'active',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Agent Surabaya',
                'email' => 'agent.surabaya@example.com',
                'agent_code' => 'AGT003',
                'phone' => '081234567892',
                'address' => 'Jl. Tunjungan No. 3, Surabaya',
                'balance' => 500000,
                'status' => 'active',
                'password' => Hash::make('password'),
            ],
        ];

        foreach ($agents as $agent) {
            User::create($agent);
        }
    }
}