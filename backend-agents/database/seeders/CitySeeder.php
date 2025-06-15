<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\City;

class CitySeeder extends Seeder
{
    public function run()
    {
        $cities = [
            ['name' => 'Jakarta', 'province' => 'DKI Jakarta', 'code' => 'JKT'],
            ['name' => 'Bandung', 'province' => 'Jawa Barat', 'code' => 'BDG'],
            ['name' => 'Surabaya', 'province' => 'Jawa Timur', 'code' => 'SBY'],
            ['name' => 'Yogyakarta', 'province' => 'DI Yogyakarta', 'code' => 'YGY'],
            ['name' => 'Semarang', 'province' => 'Jawa Tengah', 'code' => 'SMG'],
            ['name' => 'Medan', 'province' => 'Sumatera Utara', 'code' => 'MDN'],
            ['name' => 'Palembang', 'province' => 'Sumatera Selatan', 'code' => 'PLB'],
            ['name' => 'Makassar', 'province' => 'Sulawesi Selatan', 'code' => 'MKS'],
            ['name' => 'Denpasar', 'province' => 'Bali', 'code' => 'DPS'],
            ['name' => 'Balikpapan', 'province' => 'Kalimantan Timur', 'code' => 'BPN'],
        ];

        foreach ($cities as $city) {
            City::create($city);
        }
    }
}