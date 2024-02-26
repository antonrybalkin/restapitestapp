<?php

namespace App\Http\Controllers\Security;

use App\Http\Controllers\Controller;
use App\Models\Positions;

class PositionsController extends Controller
{
    public function getPositions()
    {
        return response()->json(["success" => true, "positions" => Positions::all(['id', 'name'])], 200);
    }
}
