<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class VideoContent extends Model
{
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

    public function genres(): 
    {

    }
}
