<?php

namespace App\Traits;

use App\Models\Link;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait LinkTrait
{
    public function links(string $type): HasMany
    {
        return $this->hasMany(Link::class)
            ->where('model', class_basename($this->class))
            ->where('model_id', $this->id)
            ->where('type', $type);
    }
}
