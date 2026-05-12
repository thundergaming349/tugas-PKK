<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Session;
use App\Models\Student;
use App\Models\StudentClass;
use App\Models\User;
use Illuminate\Http\Request;

use function Illuminate\Support\now;

class AttendanceController extends Controller
{
    public function attend(Request $request, int $sessionId)
    {
        $user = $request->user();
        if ($user->role !== 'siswa') {
            return response()->json([
                'message' => 'Kamu bukan siswa'
            ], 422);
        }

        $session = Session::find($sessionId);
        if (!$session) {
            return response()->json([
                'message' => 'session not found'
            ], 422);
        }

        $classId = $user->Student()->first()->class_id;
        if ($session->class_id !== $classId) {
            return response()->json([
                'message' => 'Kamu tidak berada di kelas ini'
            ], 422);
        }

        $sessionPass = Session::where('id', $sessionId)->where('date', '>', now()->addHours(7)->format('Y-m-d'))
            ->where('start', '>', now()->addHours(7)->format('H:i'))->exists();

        if ($sessionPass) {
            return response()->json([
                'message' => 'pertemuan belum dimulai',
                'type' => 'start'
            ], 422);
        }

        $attend = Attendance::where('student_id', $user->id)->where('session_id', $session->id);

        if ($attend->exists() && $attend->first()->status === 'hadir') {
            return response()->json([
                'message' => 'kamu sudah absen',
                'type' => 'hadir'
            ], 422);
        }

        $attend->update([
            'status' => "hadir"
        ]);
        return response()->json([
            'message' => 'Absen diterima'
        ]);
    }


    public function sakit(Request $request, int $studentId, int $sessionId)
    {
        $user = $request->user();
        if ($user->role !== 'guru') {
            return response()->json([
                'message' => 'kamu bukan guru'
            ]);
        }

        $student = User::with('Student')->find($studentId);
        $session = Session::with('StudentClass')->find($sessionId);

        if (!$student) {
            return response()->json([
                'message' => 'student not found'
            ], 404);
        }

        if (!$session) {
            return response()->json([
                'message' => 'session not found'
            ], 404);
        }

        if ($student->role !== 'siswa') {
            return response()->json([
                'message' => 'user ini bukan siswa'
            ], 422);
        }

        if ($student->Student()->first()->class_id !== $session->StudentClass()->first()->id) {
            return response()->json([
                'message' => 'user ini berada di kelas berbeda'
            ], 422);
        }

        $attendance = Attendance::where('student_id', $student->id)->where('session_id', $session->id)->first();
        if ($attendance->status === 'hadir') {
            return response()->json([
                'message' => 'siswa ini sudah hadir',
                'type' => 'hadir'
            ], 422);
        }

        $attendance->update([
            'status' => 'sakit'
        ]);
        return response()->json([
            'message' => 'status diubah ke sakit!'
        ]);
    }



    public function izin(Request $request, int $studentId, int $sessionId)
    {
        $user = $request->user();
        if ($user->role !== 'guru') {
            return response()->json([
                'message' => 'kamu bukan guru'
            ]);
        }

        $student = User::with('Student')->find($studentId);
        $session = Session::with('StudentClass')->find($sessionId);

        if (!$student) {
            return response()->json([
                'message' => 'student not found'
            ], 404);
        }

        if (!$session) {
            return response()->json([
                'message' => 'session not found'
            ], 404);
        }

        if ($student->role !== 'siswa') {
            return response()->json([
                'message' => 'user ini bukan siswa'
            ], 422);
        }

        if ($student->Student()->first()->class_id !== $session->StudentClass()->first()->id) {
            return response()->json([
                'message' => 'user ini berada di kelas berbeda'
            ], 422);
        }

        $attendance = Attendance::where('student_id', $student->id)->where('session_id', $session->id)->first();
        if ($attendance->status === 'hadir') {
            return response()->json([
                'message' => 'siswa ini sudah hadir',
                'type' => 'hadir'
            ], 422);
        }

        $attendance->update([
            'status' => 'izin'
        ]);
        return response()->json([
            'message' => 'status diubah ke izin!'
        ]);
    }


    public function alfa(Request $request, int $studentId, int $sessionId)
    {
        $user = $request->user();
        if ($user->role !== 'guru') {
            return response()->json([
                'message' => 'kamu bukan guru'
            ]);
        }

        $student = User::with('Student')->find($studentId);
        $session = Session::with('StudentClass')->find($sessionId);

        if (!$student) {
            return response()->json([
                'message' => 'student not found'
            ], 404);
        }

        if (!$session) {
            return response()->json([
                'message' => 'session not found'
            ], 404);
        }

        if ($student->role !== 'siswa') {
            return response()->json([
                'message' => 'user ini bukan siswa'
            ], 422);
        }

        if ($student->Student()->first()->class_id !== $session->StudentClass()->first()->id) {
            return response()->json([
                'message' => 'user ini berada di kelas berbeda'
            ], 422);
        }

        $attendance = Attendance::where('student_id', $student->id)->where('session_id', $session->id)->first();
        if ($attendance->status === 'hadir') {
            return response()->json([
                'message' => 'siswa ini sudah hadir',
                'type' => 'hadir'
            ], 422);
        }

        $attendance->update([
            'status' => 'alfa'
        ]);
        return response()->json([
            'message' => 'status diubah ke alfa!'
        ]);
    }


    public function showStudent(Request $request, int $sessionId)
    {
        $user = $request->user();
        if ($user->role !== 'guru') {
            return response()->json([
                'message' => 'kamu bukan guru'
            ], 422);
        }

        $session = Session::with('Attendance')->find($sessionId);
        if (!$session) {
            return response()->json([
                'message' => 'session not found'
            ], 404);
        }

        $studentStatus = Attendance::with('User')->where('session_id', $sessionId)->get();
        return response()->json([
            'student' => $studentStatus->map(function ($student) {
                return [
                    'id' => $student->user->id,
                    'name' => $student->user->full_name,
                    'status' => $student->status
                ];
            })
        ]);
    }
}
