<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;

class Index extends Controller
{
    public function index()
    {
        return View("index");
    }
}
