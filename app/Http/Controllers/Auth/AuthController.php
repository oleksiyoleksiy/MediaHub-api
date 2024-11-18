<?php

namespace App\Http\Controllers\Auth;

use App\Events\Auth\LoginEvent;
use App\Events\Auth\RegisterEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\Auth\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(private AuthService $service) {}

    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        $token = $this->service->login($data);

        event(new LoginEvent());

        return response()->json(['token' => $token], 200);
    }
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $token = $this->service->register($data);

        event(new RegisterEvent());

        return response()->json(['token' => $token], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
