<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Laravel\Passport\Passport;

class AuthService
{
    public function login(array $data)
    {

        if (!Auth::attempt($data)) {
            throw ValidationException::withMessages(['message' => 'unauthorized']);
        }
        return Auth::user()->createToken('LaravelAuthApp')->accessToken;
    }

    public function register(array $data)
    {
        $user = User::create($data);

        return $user->createToken('LaravelAuthApp')->accessToken;
    }
}
