<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    protected $fillable = [
        'model',
        'model_id',
        'type',
        'url'
    ];
}
