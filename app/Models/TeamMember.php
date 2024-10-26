<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class TeamMember extends Model
{
    protected $fillable = [
        'name',
        'role'
    ];


    public function videoContents(): BelongsToMany
    {
        return $this->belongsToMany(VideoContent::class, 'video_content_team_members');
    }

}
