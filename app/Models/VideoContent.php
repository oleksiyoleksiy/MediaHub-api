<?php

namespace App\Models;

use App\Traits\FileTrait;

use App\Traits\LinkTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class VideoContent extends Model
{
    use FileTrait, LinkTrait;

    protected $fillable = [
        'name',
        'type',
        'year',
        'description',
    ];

    public function seasons(): HasMany
    {
        return $this->hasMany(Season::class);
    }

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class, 'video_content_genres');
    }

    public function teamMembers(): BelongsToMany
    {
        return $this->belongsToMany(TeamMember::class, 'video_content_team_members');
    }

    public function likes(): BelongsToMany
    {
        return $this->belongsToMany(Like::class, 'video_content_likes');
    }
}
