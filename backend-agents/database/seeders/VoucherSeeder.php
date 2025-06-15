<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Voucher;
use Carbon\Carbon;

class VoucherSeeder extends Seeder
{
    public function run()
    {
        $vouchers = [
            [
                'code' => 'WELCOME10',
                'name' => 'Welcome Discount 10%',
                'description' => 'Diskon 10% untuk transaksi pertama',
                'type' => 'percentage',
                'value' => 10,
                'min_transaction' => 50000,
                'max_discount' => 25000,
                'applicable_types' => json_encode(['bus_ticket', 'ewallet_topup']),
                'usage_limit' => 100,
                'valid_from' => Carbon::now(),
                'valid_until' => Carbon::now()->addMonths(3),
            ],
            [
                'code' => 'CASHBACK5K',
                'name' => 'Cashback 5K',
                'description' => 'Cashback Rp 5.000 untuk semua transaksi',
                'type' => 'fixed',
                'value' => 5000,
                'min_transaction' => 25000,
                'max_discount' => null,
                'applicable_types' => json_encode(['internet_quota', 'electricity_token']),
                'usage_limit' => 50,
                'valid_from' => Carbon::now(),
                'valid_until' => Carbon::now()->addMonth(),
            ],
            [
                'code' => 'BUSMURAH',
                'name' => 'Bus Murah 15%',
                'description' => 'Diskon khusus tiket bus 15%',
                'type' => 'percentage',
                'value' => 15,
                'min_transaction' => 100000,
                'max_discount' => 50000,
                'applicable_types' => json_encode(['bus_ticket']),
                'usage_limit' => null,
                'valid_from' => Carbon::now(),
                'valid_until' => Carbon::now()->addWeeks(2),
            ],
        ];

        foreach ($vouchers as $voucher) {
            Voucher::create($voucher);
        }
    }
}