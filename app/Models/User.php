<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['full_name', 'email', 'password', 'role'])]
#[Hidden(['password'])]
class User extends Authenticatable
{
    use HasApiTokens;

    public function Student()
    {
        return $this->hasOne(Student::class, 'user_id', 'id');
    }

    public function Attendance()
    {
        return $this->hasMany(Attendance::class, 'student_id', 'id');
    }

    public function Subject()
    {
        return $this->hasMany(Subject::class, 'teacher_id', 'id');
    }

    public static function checkAndAddOngoingSessionAttendance($userId, $classId)
    {
        $today = now()->addHours(7)->format('Y-m-d');
        $currentTime = now()->addHours(7)->format('H:i:s');

        $ongoingSessions = \App\Models\Session::where('class_id', $classId)
            ->where('date', $today)
            ->where('start', '<=', $currentTime)
            ->where('end', '>=', $currentTime)
            ->where('hidden', false)
            ->get();

        foreach ($ongoingSessions as $session) {
            \App\Models\Attendance::firstOrCreate([
                'student_id' => $userId,
                'session_id' => $session->id,
            ], [
                'status' => 'alfa'
            ]);
        }
    }
}
