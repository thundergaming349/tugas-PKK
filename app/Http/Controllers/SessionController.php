<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Session;
use App\Models\Student;
use App\Models\StudentClass;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use SessionIdInterface;

class SessionController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'guru') {
            return response()->json([
                'message' => 'Kamu bukan guru'
            ], 422);
        }

        $subId = $user->Subject()->get('id');

        $subject_id = [];
        foreach ($subId as $id) {
            $subject_id[] = $id->id;
        }


        $validated = Validator::make($request->all(), [
            'class_id' => 'required|int|exists:student_classes,id',
            'subject_id' => 'required|int|exists:subjects,id',
            'date' => 'required|date_format:Y-m-d',
            'start' => 'required|date_format:H:i',
            'end' => 'required|date_format:H:i'
        ], [
            'class_id.exists' => "class ID doesn't exists",
            'subject_id' => "subject ID doesn't exists"
        ]);

        if ($validated->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validated->errors()
            ], 422);
        }

        if ($request['start'] > $request['end']) {
            return response()->json([
                'message' => 'Waktu mulai tidak bisa lebih dari waktu berakhir'
            ], 422);
        }


        if ($request['start'] < "06:30") {
            return response()->json([
                'message' => 'waktu mulai minimal jam 06:30'
            ], 422);
        }

        $subject = Subject::find($request['subject_id']);
        if ($subject->teacher_id !== $user->id) {
            return response()->json([
                'message' => 'Forbidden access'
            ], 422);
        }

        $collapse = Session::whereIn('subject_id', $subject_id)->where('date', $request['date'])
            ->where('start', '<', $request['end'])->where('end', '>', $request['start'])->exists();
        if ($collapse) {
            return response()->json([
                'message' => 'Guru ada jadwal lain yang bertabrakan',
                'type' => 'conflict'
            ], 422);
        }

        $session = Session::create($validated->validated());
        Student::with('User')->where('class_id', $request['class_id'])->get()->map(function ($student) use ($session) {
            Attendance::create([
                'student_id' => $student->user_id,
                'session_id' => $session->id,
                'status' => 'alfa'
            ]);
        });

        return response()->json([
            'message' => 'session created'
        ], 201);
    }

    public function update(Request $request, int $id)
    {
        $user = $request->user();

        if ($user->role !== 'guru') {
            return response()->json([
                'message' => 'Kamu bukan guru'
            ], 422);
        }

        $session = Session::find($id);
        if (!$session) {
            return response()->json([
                'message' => 'session not found'
            ], 404);
        }

        $subId = $user->Subject()->get('id');

        $subject_id = [];
        foreach ($subId as $ids) {
            $subject_id[] = $ids->id;
        }

        $validated = Validator::make($request->all(), [
            'date' => 'required|date_format:Y-m-d',
            'start' => 'required|date_format:H:i:s',
            'end' => 'required|date_format:H:i:s'
        ]);

        if ($validated->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validated->errors()
            ], 422);
        }

        if ($request['start'] > $request['end']) {
            return response()->json([
                'message' => 'Waktu mulai tidak bisa lebih dari waktu berakhir'
            ], 422);
        }


        if ($request['start'] < "06:30") {
            return response()->json([
                'message' => 'waktu mulai minimal jam 06:30'
            ], 422);
        }

        if (!in_array($session->subject_id, $subject_id)) {
            return response()->json([
                'message' => 'Kamu tidak punya hak untuk mengubah sesi ini'
            ], 422);
        }

        $collapse = Session::whereNot('id', $id)->whereIn('subject_id', $subject_id)->where('date', $request['date'])
            ->where('start', '<', $request['end'])->where('end', '>', $request['start'])->exists();
        if ($collapse) {
            return response()->json([
                'message' => 'Guru ada jadwal lain yang bertabrakan',
                'type' => 'conflict'
            ], 422);
        }

        $session->update($validated->validated());
        return response()->json([
            'message' => 'session modified'
        ]);
    }

    public function show(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'guru') {
            return response()->json([
                'message' => 'Kamu bukan guru'
            ], 422);
        }

        $subId = $user->Subject()->get('id');

        $subject_id = [];
        foreach ($subId as $id) {
            $subject_id[] = $id->id;
        }

        $query = Session::query()->with('Subject', 'StudentClass')->whereHas('Subject', function ($q) use ($subject_id) {
            $q->whereIn('subject_id', $subject_id);
        })->get();

        return response()->json([
            'session' => $query->map(function ($q) {
                return [
                    'id' => $q->id,
                    'class_id' => $q->class_id,
                    'class_name' => $q->StudentClass()->first()->name,
                    'subject_id' => $q->subject_id,
                    'subject_name' => $q->Subject()->first()->name,
                    'date' => $q->date,
                    'start' => substr($q->start, 0, 5),
                    'end' => substr($q->end, 0, 5),
                    'hidden' => $q->hidden
                ];
            })
        ]);
    }


    public function studentShow(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'siswa') {
            return response()->json([
                'message' => 'Kamu bukan siswa'
            ], 422);
        }

        $classId = $user->Student()->first('class_id');

        $query = Session::query()->with('Subject', 'StudentClass')->where('class_id', $classId->class_id)
            ->get();

        return response()->json([
            'session' => $query->map(function ($q) {
                return [
                    'id' => $q->id,
                    'class_id' => $q->class_id,
                    'class_name' => $q->StudentClass()->first()->name,
                    'subject_id' => $q->subject_id,
                    'subject_name' => $q->Subject()->first()->name,
                    'date' => $q->date,
                    'start' => substr($q->start, 0, 5),
                    'end' => substr($q->end, 0, 5),
                    'hidden' => $q->hidden
                ];
            })
        ]);
    }


    public function destroy(Request $request, int $id)
    {
        $user = $request->user();

        if ($user->role !== 'guru') {
            return response()->json([
                'message' => 'Kamu bukan guru'
            ], 422);
        }

        $session = Session::find($id);
        if (!$session) {
            return response()->json([
                'message' => 'session not found'
            ], 404);
        }

        $subId = $user->Subject()->get('id');

        $subject_id = [];
        foreach ($subId as $ids) {
            $subject_id[] = $ids->id;
        }

        if (!in_array($session->subject_id, $subject_id)) {
            return response()->json([
                'message' => 'Kamu tidak punya hak untuk menghapus sesi ini'
            ], 422);
        }

        Session::destroy($id);
        return response()->json('', 204);
    }


    public function hide(int $sessionId)
    {
        $session = Session::find($sessionId);
        if (!$session) {
            return response()->json([
                'message' => 'not found'
            ], 404);
        }
        $session->update([
            'hidden' => true
        ]);
    }
}
