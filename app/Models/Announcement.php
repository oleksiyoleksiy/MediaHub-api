<?php

namespace App\Models;

use App\Traits\FileTrait;
use App\Traits\Traits\LinkTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Announcement extends Model
{
    use FileTrait, LinkTrait;

    protected $fillable = [
        'description'
    ];
}
