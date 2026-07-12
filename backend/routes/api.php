<?php

use App\Http\Controllers\Api\MediaController;
use Illuminate\Support\Facades\Route;

Route::get('/media', [MediaController::class, 'index']);
