<?php

namespace App\Http\Controllers;

use App\Models\Token;
use Illuminate\Http\Request;

class TokenController extends Controller
{
    public function store(Request $request)
    {

        $tokenName = md5(uniqid() . rand(1000000, 9999999));
        Token::create([
            'token' => $tokenName,
            'expires_at' => now()->addMinutes(40),
        ]);

        return response()->json([
            "success" => true,
            "token" => $tokenName,
        ], 200);
    }
}
