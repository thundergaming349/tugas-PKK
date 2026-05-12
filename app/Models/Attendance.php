<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Table(incrementing: true, timestamps:true)]
#[Fillable(['student_id', 'session_id', 'status'])]
class Attendance extends Model
{
    public function User() {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function Session() {
        return $this->belongsTo(Session::class, 'session_id');
    }
}
