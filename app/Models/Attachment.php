<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Table(incrementing: true, timestamps: false)]
#[Fillable(['post_id', 'storage_url'])]
#[Hidden(['post_id'])]
class Attachment extends Model
{
    public function Post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
}
