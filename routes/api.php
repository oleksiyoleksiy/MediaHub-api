<?php

use App\Enums\TokenAbility;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\Settings\SettingsController;
use App\Http\Controllers\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('guest:sanctum')->controller(AuthController::class)->group(
    function () {
        Route::post('/login', 'login');
        Route::post('/register', 'register');
    }
);

Route::middleware(['auth:sanctum', 'ability:' . TokenAbility::ACCESS_API->value])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [UserController::class, 'current']);
    Route::apiResource('settings', SettingsController::class);
});

Route::post('/refresh', [AuthController::class, 'refresh'])
    ->middleware(['auth:sanctum', 'ability:' . TokenAbility::ISSUE_ACCESS_TOKEN->value]);
