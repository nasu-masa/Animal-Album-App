<?php

use App\Http\Controllers\Api\MediaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/media', [MediaController::class, 'index']);
Route::get('/media/{media}', [MediaController::class, 'show']);
Route::middleware('auth:sanctum')->post('/media', [MediaController::class, 'store']);
