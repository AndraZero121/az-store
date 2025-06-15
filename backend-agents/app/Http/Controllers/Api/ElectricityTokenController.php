<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ElectricityTokenController extends Controller
{
    public function denominations()
    {
        // TODO: Get available token denominations
    }

    public function purchase(Request $request)
    {
        // TODO: Purchase electricity token
    }

    public function inquiry(Request $request)
    {
        // TODO: Inquiry customer data
    }

    public function confirm($transactionId)
    {
        // TODO: Confirm token purchase
    }

    public function history(Request $request)
    {
        // TODO: Get token purchase history
    }
}