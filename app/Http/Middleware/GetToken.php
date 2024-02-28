<?php

namespace App\Http\Middleware;

use App\Models\Token;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;

class GetToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {

        if ($request->headers->has("token")) {
            $token = $request->headers->get("token");
            $tokenModel = Token::where("token", $token)->first();

            if ($tokenModel) {
                if ((strtotime($tokenModel->expires_at)) < Carbon::now()->timestamp) {
                    $tokenModel->delete();
                    return response()->json([
                        "success" => false,
                        "message" => "The token expired.",
                    ], 401);
                }
                $tokenModel->delete();
                return $next($request);
            } else {
                return response()->json([
                    "success" => false,
                    "message" => "The token expired.",
                ], 401);
            }
        }
        return response()->json([
            "success" => false,
            "message" => "The token expired.",
        ], 401);
    }
}
