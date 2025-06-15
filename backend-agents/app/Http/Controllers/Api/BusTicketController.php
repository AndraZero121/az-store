<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BusTicketController extends Controller
{
    public function routes(Request $request)
    {
        // TODO: Get available bus routes
    }

    public function search(Request $request)
    {
        // TODO: Search bus tickets
    }

    public function book(Request $request)
    {
        // TODO: Book bus ticket
    }

    public function confirm($transactionId)
    {
        // TODO: Confirm bus ticket booking
    }

    public function cancel($transactionId)
    {
        // TODO: Cancel bus ticket booking
    }

    public function tickets(Request $request)
    {
        // TODO: Get booked tickets
    }
}