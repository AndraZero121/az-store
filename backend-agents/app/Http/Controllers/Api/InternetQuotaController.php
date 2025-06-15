<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InternetQuotaController extends Controller
{
    public function providers()
    {
        // TODO: Get internet providers list
    }

    public function packages($providerId)
    {
        // TODO: Get quota packages by provider
    }

    public function purchase(Request $request)
    {
        // TODO: Purchase internet quota
    }

    public function confirm($transactionId)
    {
        // TODO: Confirm quota purchase
    }

    public function history(Request $request)
    {
        // TODO: Get quota purchase history
    }
}