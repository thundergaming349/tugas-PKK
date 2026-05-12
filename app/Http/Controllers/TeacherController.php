<?php

namespace App\Http\Controllers;

use App\Models\StudentClass;
use App\Models\Subject;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function ShowClass(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'guru') {
            return response()->json([
                'message' => 'Forbidden Access'
            ], 403);
        }

        $query = StudentClass::get();
        return response()->json([
            'class' => $query
        ]);
    }


    public function ShowSubj(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'guru') {
            return response()->json([
                'message' => 'Forbidden Access'
            ], 403);
        }

        $query = Subject::where('teacher_id', $user->id)->get();
        return response()->json([
            'subject' => $query
        ]);
    }
}
