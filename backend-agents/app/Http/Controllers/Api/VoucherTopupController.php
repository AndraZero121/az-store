<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VoucherTopupController extends Controller
{
    public function types()
    {
        // TODO: Get voucher types (game, pulsa, etc)
    }

    public function denominations($typeId)
    {
        // TODO: Get voucher denominations
    }

    public function purchase(Request $request)
    {
        // TODO: Purchase voucher
    }

    public function confirm($transactionId)
    {
        // TODO: Confirm voucher purchase
    }

    public function history(Request $request)
    {
        // TODO: Get voucher purchase history
    }
}