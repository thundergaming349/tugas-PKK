<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Table(incrementing: true, timestamps: true)]
#[Fillable(['caption', 'session_id'])]
class Post extends Model
{
    public function Attachment()
    {
        return $this->hasMany(Attachment::class, 'post_id', 'id');
    }
}
