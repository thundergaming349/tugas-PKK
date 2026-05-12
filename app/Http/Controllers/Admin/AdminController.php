<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StudentClass;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
}
