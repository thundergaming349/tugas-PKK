<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\StudentClass;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'full_name' => ['required', 'regex:/^[A-Za-z_ ]+$/'],
            'email' => ['required', 'email', 'unique:users,email', 'regex:/^[A-Za-z0-9_.@ ]+$/'],
            'password' => 'required|min:6',
            'class_id' => 'required'
        ], [
            'full_name.regex' => 'Invalid character found, field must be alphabet and _',
        ]);

        if ($validated->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validated->errors()
            ], 422);
        }

        $class = StudentClass::find($request['class_id']);
        if (!$class) {
            return response()->json([
                'message' => 'class not found'
            ], 404);
        }

        $student = User::create([
            'full_name' => $request['full_name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password'])
        ]);


        Student::create([
            'user_id' => $student->id,
            'class_id' => $request['class_id']
        ]);

        return response()->json([
            'message' => 'Account successfully created'
        ], 201);
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request['email']);

        if (!$user->exists() || !Hash::check($request['password'], $user->first()->password)) {
            return response()->json([
                'message' => 'email or password incorrect'
            ], 401);
        }

        $token = $user->first()->createToken('auth')->plainTextToken;
        return response()->json([
            'message' => 'login success',
            'token' => $token,
            'user' => $user->first()
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        $user->tokens()->delete();

        return response()->json([
            'message' => 'logout success'
        ]);
    }
}
