<?php

namespace App\Models;

use App\Traits\FileTrait;
use App\Traits\LinkTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Episode extends Model
{
    use LinkTrait, FileTrait;

    protected $fillable = [
        'season_id',
        'name',
    ];

    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class);
    }
}
