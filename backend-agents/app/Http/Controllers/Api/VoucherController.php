<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    public function index()
    {
        // TODO: Get available vouchers
    }

    public function show($code)
    {
        // TODO: Get voucher details
    }

    public function validate(Request $request)
    {
        // TODO: Validate voucher code
    }

    public function apply(Request $request)
    {
        // TODO: Apply voucher to transaction
    }

    public function myVouchers(Request $request)
    {
        // TODO: Get agent's used vouchers
    }
}