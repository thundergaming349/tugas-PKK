<?php

namespace App\Http\Controllers\Summary;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Session;
use Illuminate\Http\Request;

class TeacherSummary extends Controller
{
    public function summary(Request $request, int $sessionId)
    {
        $user = $request->user();
        if ($user->role !== 'guru') {
            return response()->json([
                'message' => 'kamu bukan guru'
            ]);
        }

        $session = Session::find($sessionId);
        if (!$session) {
            return response()->json([
                'message' => 'Session not found'
            ], 404);
        }

        $subject = $user->Subject()->get('id');
        $subjId = [];
        foreach ($subject as $subj) {
            $subjId[] = $subj->id;
        }


        if (!in_array($session->subject_id, $subjId)) {
            return response()->json([
                'message' => 'sesi ini milik guru lain'
            ], 422);
        }

        $summary = Attendance::query()->with('Session', 'User')->where('session_id', $sessionId)->get();

        return response()->json([
            'summary' => [
                'banyak siswa' => $summary->count(),
                'hadir' => $summary->filter(function ($q) {
                    return $q->status === 'hadir';
                })->count(),
                'tidak_hadir' => $summary->filter(function ($q) {
                    return $q->status !== 'hadir';
                })->count(),
                'sakit' => $summary->filter(function ($q) {
                    return $q->status === 'sakit';
                })->count(),
                'izin' => $summary->filter(function ($q) {
                    return $q->status === 'izin';
                })->count(),
                'alfa' => $summary->filter(function ($q) {
                    return $q->status === 'alfa';
                })->count(),
                'siswa_tidak_hadir' => $summary->filter(function ($q) {
                    return $q->status !== 'hadir';
                })->map(function ($siswa) {
                    return [
                        'nama' => $siswa->user->full_name,
                        'status' => $siswa->status
                    ];
                })
            ]
        ]);
    }
}
