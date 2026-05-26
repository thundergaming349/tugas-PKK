<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StudentClass;
use App\Models\Subject;
use App\Models\User;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function StoreClass(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden Access'
            ], 403);
        }

        $validated = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if ($validated->fails()) {
            return response()->json([
                'message' => 'Invalid field'
            ], 422);
        }

        StudentClass::create($validated->validated());
        return response()->json([
            'message' => 'class created'
        ], 201);
    }

    public function UpdateClass(Request $request, int $id)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden Access'
            ], 403);
        }

        $class = StudentClass::find($id);
        if (!$class) {
            return response()->json([
                'message' => 'Class not found'
            ], 404);
        }

        $validated = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if ($validated->fails()) {
            return response()->json([
                'message' => 'Invalid field'
            ], 422);
        }

        $class->update($validated->validated());
        return response()->json([
            'message' => 'Class modifed'
        ]);
    }

    public function DestroyClass(Request $request, int $id)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden Access'
            ], 403);
        }

        $class = StudentClass::find($id);
        if (!$class) {
            return response()->json([
                'message' => 'Class not found'
            ], 404);
        }

        StudentClass::destroy($id);
        return response()->json('', 204);
    }

    public function ShowClass(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden Access'
            ], 403);
        }

        $query = StudentClass::get();
        return response()->json([
            'class' => $query
        ]);
    }

    public function ShowClassPublic()
    {
        $query = StudentClass::get();
        return response()->json([
            'class' => $query
        ]);
    }

    public function StoreSubj(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden Access'
            ], 403);
        }

        $validated = Validator::make($request->all(), [
            'name' => 'required',
            'teacher_id' => 'required|int'
        ]);

        if ($validated->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'error' => $validated->errors()
            ], 422);
        }

        $teacher = User::find($request['teacher_id']);
        if ($teacher->role !== 'guru') {
            return response()->json([
                'message' => 'pengguna ini bukan guru'
            ], 422);
        }

        if (Subject::where('teacher_id', $request['teacher_id'])->where('name', $request['name'])->exists()) {
            return response()->json([
                'message' => 'Mata pelajaran dengan guru tertentu sudah tersedia',
                'type' => 'exists'
            ], 422);
        }

        Subject::create($validated->validated());
        return response()->json([
            'message' => 'subject created'
        ], 201);
    }


    public function UpdateSubj(Request $request, int $id)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden Access'
            ], 403);
        }

        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json([
                'message' => 'Subject not found'
            ], 404);
        }

        $validated = Validator::make($request->all(), [
            'name' => 'required',
            'teacher_id' => 'required|int'
        ]);

        if ($validated->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'error' => $validated->errors()
            ], 422);
        }

        $teacher = User::find($request['teacher_id']);
        if ($teacher->role !== 'guru') {
            return response()->json([
                'message' => 'pengguna ini bukan guru'
            ], 422);
        }

        if (Subject::where('teacher_id', $request['teacher_id'])->where('name', $request['name'])
            ->whereNot('id', $id)->exists()
        ) {
            return response()->json([
                'message' => 'Mata pelajaran dengan guru tertentu sudah tersedia',
                'type' => 'exists'
            ], 422);
        }

        $subject->update($validated->validated());
        return response()->json([
            'message' => 'Subject modifed'
        ]);
    }

    public function DestroySubj(Request $request, int $id)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden Access'
            ], 403);
        }

        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json([
                'message' => 'Subject not found'
            ], 404);
        }

        Subject::destroy($id);
        return response()->json('', 204);
    }

    public function ShowSubj(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden Access'
            ], 403);
        }

        $query = Subject::get();
        return response()->json([
            'subject' => $query
        ]);
    }

    public function ShowUsers(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden Access'
            ], 403);
        }

        $query = User::with('Student.StudentClass')->get();
        return response()->json([
            'users' => $query->map(function ($u) {
                return [
                    'id' => $u->id,
                    'full_name' => $u->full_name,
                    'email' => $u->email,
                    'role' => $u->role,
                    'class_id' => $u->Student ? $u->Student->class_id : null,
                    'class_name' => ($u->Student && $u->Student->StudentClass) ? $u->Student->StudentClass->name : null,
                ];
            })
        ]);
    }

    public function StoreUser(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden Access'
            ], 403);
        }

        $rules = [
            'full_name' => ['required', 'regex:/^[A-Za-z_ ]+$/'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => 'required|min:6',
            'role' => 'required|in:admin,guru,siswa',
        ];

        if ($request->role === 'siswa') {
            $rules['class_id'] = 'required|exists:student_classes,id';
        }

        $validated = Validator::make($request->all(), $rules);

        if ($validated->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validated->errors()
            ], 422);
        }

        $newUser = User::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        if ($request->role === 'siswa') {
            Student::create([
                'user_id' => $newUser->id,
                'class_id' => $request->class_id
            ]);
            User::checkAndAddOngoingSessionAttendance($newUser->id, $request->class_id);
        }

        return response()->json([
            'message' => 'User created successfully',
            'user' => $newUser
        ], 201);
    }

    public function UpdateUser(Request $request, int $id)
    {
        $admin = $request->user();

        if ($admin->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden Access'
            ], 403);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $rules = [
            'full_name' => ['required', 'regex:/^[A-Za-z_ ]+$/'],
            'email' => ['required', 'email', 'unique:users,email,' . $id],
            'role' => 'required|in:admin,guru,siswa',
        ];

        if ($request->filled('password')) {
            $rules['password'] = 'min:6';
        }

        if ($request->role === 'siswa') {
            $rules['class_id'] = 'required|exists:student_classes,id';
        }

        $validated = Validator::make($request->all(), $rules);

        if ($validated->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validated->errors()
            ], 422);
        }

        $user->full_name = $request->full_name;
        $user->email = $request->email;
        $user->role = $request->role;
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }
        $user->save();

        if ($request->role === 'siswa') {
            Student::updateOrCreate(
                ['user_id' => $user->id],
                ['class_id' => $request->class_id]
            );
            User::checkAndAddOngoingSessionAttendance($user->id, $request->class_id);
        } else {
            Student::where('user_id', $user->id)->delete();
        }

        return response()->json([
            'message' => 'User updated successfully'
        ]);
    }

    public function DestroyUser(Request $request, int $id)
    {
        $admin = $request->user();

        if ($admin->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden Access'
            ], 403);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        if ($user->id === $admin->id) {
            return response()->json([
                'message' => 'Cannot delete yourself'
            ], 422);
        }

        User::destroy($id);
        return response()->json('', 204);
    }
}
