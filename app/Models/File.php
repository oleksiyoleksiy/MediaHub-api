<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $fillable = [
        'model',
        'model_id',
        'type',
        'path'
    ];

    
}
