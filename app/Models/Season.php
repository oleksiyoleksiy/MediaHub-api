<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Season extends Model
{
    protected $fillable = [
        'season',
        'name'
    ];

    public function episodes(): HasMany
    {
        return $this->hasMany(Episode::class);
    }
}
