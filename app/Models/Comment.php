<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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

    public function likes(): BelongsToMany
    {
        return $this->belongsToMany(Like::class, 'video_content_likes');
    }
}
