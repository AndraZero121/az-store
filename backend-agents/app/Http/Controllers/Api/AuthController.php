<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Handle user login.
     */
    public function login(Request $request)
    {
        try {
            Log::info('Login attempt', ['email' => $request->input('email')]);

            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]);

            $user = User::where('email', $request->input('email'))->first();

            if (!$user || !Hash::check($request->input('password'), $user->password)) {
                Log::warning('Login failed', ['email' => $request->input('email')]);
                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            Log::info('Login successful', ['email' => $request->input('email')]);
            return response()->json([
                'message' => 'Login successful',
                'user' => $user->only(['id', 'name', 'email', 'phone', 'address', 'agent_code', 'balance', 'status', 'last_transaction']),
                'token' => $user->createToken('auth_token')->plainTextToken
            ]);
        } catch (\Exception $e) {
            Log::error('Login error', ['email' => $request->input('email'), 'error' => $e->getMessage()]);
            return response()->json(['message' => 'Login failed'], 500);
        }
    }

    /**
     * Handle user registration.
     */
    public function register(Request $request)
    {
        try {
            Log::info('Registration attempt', ['email' => $request->input('email')]);

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6|confirmed',
                'phone' => 'nullable|string|max:15',
                'address' => 'nullable|string|max:255',
                'last_transaction' => 'nullable|date',
            ]);

            if ($validator->fails()) {
                Log::error('Registration validation error', [
                    'email' => $request->input('email'),
                    'errors' => $validator->errors()->toArray()
                ]);
                return response()->json([
                    'message' => 'Registration failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'phone' => $request->input('phone'),
                'address' => $request->input('address'),
                'agent_code' => 'AGT-' . strtoupper(uniqid()),
                'balance' => 0.00,
                'status' => 'active',
                'last_transaction' => null,
            ]);

            Log::info('Registration successful', ['email' => $user->email]);
            return response()->json([
                'message' => 'Registration successful',
                'user' => $user->only(['id', 'name', 'email', 'phone', 'address', 'agent_code', 'balance', 'status', 'last_transaction'])
            ], 201);
        } catch (\Exception $e) {
            Log::error('Registration error', ['email' => $request->input('email'), 'error' => $e->getMessage()]);
            return response()->json(['message' => 'Registration failed'], 500);
        }
    }

    /**
     * Handle user logout.
     */
    public function logout(Request $request)
    {
        try {
            Log::info('Logout attempt', ['user_id' => $request->user()->id]);

            $request->user()->tokens()->delete();

            Log::info('Logout successful', ['user_id' => $request->user()->id]);
            return response()->json(['message' => 'Logout successful']);
        } catch (\Exception $e) {
            Log::error('Logout error', ['user_id' => $request->user()->id, 'error' => $e->getMessage()]);
            return response()->json(['message' => 'Logout failed'], 500);
        }
    }

    /**
     * Get user profile.
     */
    public function profile(Request $request)
    {
        try {
            Log::info('Profile view attempt', ['user_id' => $request->user()->id]);

            return response()->json([
                'user' => $request->user()->only(['id', 'name', 'email', 'phone', 'address', 'agent_code', 'balance', 'status', 'last_transaction'])
            ]);
        } catch (\Exception $e) {
            Log::error('Profile view error', ['user_id' => $request->user()->id, 'error' => $e->getMessage()]);
            return response()->json(['message' => 'Profile view failed'], 500);
        }
    }

    /**
     * Update user profile.
     */
    public function updateProfile(Request $request)
    {
        try {
            Log::info('Profile update attempt', ['user_id' => $request->user()->id]);

            $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|email|unique:users,email,' . $request->user()->id,
                'phone' => 'sometimes|nullable|string|max:15',
                'address' => 'sometimes|nullable|string|max:255',
            ]);

            $request->user()->update($request->only('name', 'email', 'phone', 'address'));

            Log::info('Profile update successful', ['user_id' => $request->user()->id]);
            return response()->json(['message' => 'Profile updated successfully']);
        } catch (\Exception $e) {
            Log::error('Profile update error', ['user_id' => $request->user()->id, 'error' => $e->getMessage()]);
            return response()->json(['message' => 'Profile update failed'], 500);
        }
    }

    /**
     * Change user password.
     */
    public function changePassword(Request $request)
    {
        try {
            Log::info('Password change attempt', ['user_id' => $request->user()->id]);

            $request->validate([
                'current_password' => 'required|string|min:6',
                'new_password' => 'required|string|min:6|confirmed',
            ]);

            if (!Hash::check($request->input('current_password'), $request->user()->password)) {
                Log::warning('Password change failed', ['user_id' => $request->user()->id]);
                return response()->json(['message' => 'Current password is incorrect'], 401);
            }

            $request->user()->update(['password' => Hash::make($request->input('new_password'))]);

            Log::info('Password change successful', ['user_id' => $request->user()->id]);
            return response()->json(['message' => 'Password changed successfully']);
        } catch (\Exception $e) {
            Log::error('Password change error', ['user_id' => $request->user()->id, 'error' => $e->getMessage()]);
            return response()->json(['message' => 'Password change failed'], 500);
        }
    }
}
