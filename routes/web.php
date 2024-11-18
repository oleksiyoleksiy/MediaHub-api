<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;


Route::get('/login', function () {
    return Inertia::render('Login');
});
Route::get('/', function () {
    return Inertia::render('Home');
});
