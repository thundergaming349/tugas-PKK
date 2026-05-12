<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['user_id', 'class_id'])]
#[Table(timestamps: false)]
class Student extends Model
{
    public function StudentClass() {
        return $this->belongsTo(StudentClass::class, 'class_id');
    }

    public function User() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
