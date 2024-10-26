<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Genre extends Model
{
    protected $fillable = [
        'name'
    ];

    public function videoContents(): BelongsToMany
    {
        return $this->belongsToMany(VideoContent::class, 'video_content_genres');
    }
}
