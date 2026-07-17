<?php

use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\MediaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/media', [MediaController::class, 'index']);
Route::middleware('auth:sanctum')->get('/media/mine', [MediaController::class, 'mine']);
Route::get('/media/{media}', [MediaController::class, 'show']);
Route::middleware('auth:sanctum')->post('/media', [MediaController::class, 'store']);
Route::middleware('auth:sanctum')->delete('/media/{media}', [MediaController::class, 'destroy']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites/{media}', [FavoriteController::class, 'store']);
    Route::delete('/favorites/{media}', [FavoriteController::class, 'destroy']);
});
