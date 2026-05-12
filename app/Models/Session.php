<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Table(incrementing: true, timestamps: true)]
#[Fillable(['class_id', 'subject_id', 'date', 'start', 'end', 'hidden'])]
class Session extends Model
{
    public function StudentClass() {
        return $this->belongsTo(StudentClass::class, 'class_id');
    }

    public function Subject() {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function Attendance() {
        return $this->hasMany(Attendance::class, 'session_id', 'id');
    }
}
