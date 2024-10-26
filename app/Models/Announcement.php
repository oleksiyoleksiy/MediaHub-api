<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Announcement extends Model
{
    protected $fillable = [
        'description'
    ];

    public function videoContent(): HasOne
    {
        return $this->hasOne(VideoContent::class);
    }
}
