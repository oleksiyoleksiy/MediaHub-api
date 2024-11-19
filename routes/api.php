<?php

use App\Enums\TokenAbility;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('guest:sanctum')->controller(AuthController::class)->group(
    function () {
        Route::post('/login', 'login');
        Route::post('/register', 'register');
        Route::post('/refresh', 'refresh');
    }
);

Route::middleware(['auth:sanctum', 'ability:' . TokenAbility::ACCESS_API->value])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', fn (Request $request) => $request->user());
});

Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('ability:' . TokenAbility::ISSUE_ACCESS_TOKEN->value);
