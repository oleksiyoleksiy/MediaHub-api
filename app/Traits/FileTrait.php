<?php

namespace App\Traits;

use App\Models\File;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\UploadedFile;

trait FileTrait
{
    public function files(string $type): HasMany
    {
        return $this->hasMany(File::class)
            ->where('model', class_basename($this->class))
            ->where('model_id', $this->id)
            ->where('type', $type);
    }
}
