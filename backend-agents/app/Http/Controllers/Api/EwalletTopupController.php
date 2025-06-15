<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EwalletTopupController extends Controller
{
    public function providers()
    {
        // TODO: Get e-wallet providers
    }

    public function denominations($providerId)
    {
        // TODO: Get topup denominations
    }

    public function topup(Request $request)
    {
        // TODO: Topup e-wallet
    }

    public function inquiry(Request $request)
    {
        // TODO: Inquiry customer account
    }

    public function confirm($transactionId)
    {
        // TODO: Confirm topup
    }

    public function history(Request $request)
    {
        // TODO: Get topup history
    }
}