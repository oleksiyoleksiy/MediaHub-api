<?php

namespace App\Traits;

use App\Models\File;
use Illuminate\Database\Eloquent\Model;

trait FileTrait
{
    public function getFile(string $type) {
        return File::where('model', class_basename($this::class))
        ->where('model_id', $this->id)
        ->where('type', $type)
        ->get();
    }
}
