<?php

use App\Http\Controllers\Security\PositionsController;
use App\Http\Controllers\Security\UsersController;
use App\Http\Controllers\TokenController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */
Route::group(['prefix' => 'v1'], function () {

    Route::get('/token', [TokenController::class, 'store']);
    Route::get('/user/{id}', [UsersController::class, 'getUserByID']);
    Route::get('/users', [UsersController::class, 'getUsers']);
    Route::get('/positions', [PositionsController::class, 'getPositions']);

    Route::group(['middleware' => 'token'], function () {
        Route::post('/users', [UsersController::class, 'addUser'])->name("postUser");
    });

});
