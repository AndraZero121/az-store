<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index()
    {
        // TODO: Get all cities
    }

    public function provinces()
    {
        // TODO: Get all provinces
    }

    public function byProvince($province)
    {
        // TODO: Get cities by province
    }

    public function search(Request $request)
    {
        // TODO: Search cities
    }
}