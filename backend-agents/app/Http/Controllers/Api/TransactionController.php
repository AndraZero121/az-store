<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        // TODO: Get all transactions with filters
    }

    public function show($id)
    {
        // TODO: Get transaction detail
    }

    public function cancel($id)
    {
        // TODO: Cancel transaction
    }

    public function receipt($id)
    {
        // TODO: Generate transaction receipt/struk
    }

    public function history(Request $request)
    {
        // TODO: Get transaction history with pagination
    }

    public function summary(Request $request)
    {
        // TODO: Get transaction summary by date range
    }
}