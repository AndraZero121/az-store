<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // TODO: Get dashboard overview data
    }

    public function stats(Request $request)
    {
        // TODO: Get transaction statistics
    }

    public function monthlyTransactions(Request $request)
    {
        // TODO: Get monthly transaction breakdown
    }

    public function recentTransactions(Request $request)
    {
        // TODO: Get recent transactions
    }

    public function balance(Request $request)
    {
        // TODO: Get agent balance info
    }
}