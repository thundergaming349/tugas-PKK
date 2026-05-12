<?php

namespace App\Http\Controllers\Summary;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\Request;

class StudentSummary extends Controller
{
    public function summary(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'siswa') {
            return response()->json([
                'message' => 'kamu bukan siswa'
            ]);
        }

        $summary = Attendance::query()->with('Session')->where('student_id', $user->id)->get();

        return response()->json([
            'summary' => [
                'kelas_tersedia' => $summary->count(),
                'hadir' => $summary->filter(function ($val) {
                    return $val->status === 'hadir';
                })->count(),
                'tidak_hadir' => $summary->filter(function ($val) {
                    return $val->status !== 'hadir';
                })->count()
            ]
        ]);
    }
}
