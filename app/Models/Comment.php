<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $fillable = [
        'user_id',
        'video_content_id',
        'content',
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function videoContent(): BelongsTo
    {
        return $this->belongsTo(VideoContent::class);
    }
}
