<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name'])]
#[Table(timestamps: false)]
class StudentClass extends Model
{
    public function Student() {
        return $this->hasMany(Student::class, 'class_id', 'id');
    }

    public function Session() {
        return $this->hasMany(Session::class, 'class_id', 'id');
    }
}

