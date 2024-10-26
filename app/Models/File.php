<?php

namespace App\Models;

use App\Observers\FileObserver;
use Illuminate\Http\UploadedFile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class File extends Model
{
    protected $fillable = [
        'model',
        'model_id',
        'type',
        'path'
    ];

    public static function boot()
    {
        self::observe(FileObserver::class);
    }

    public function store(UploadedFile $file, string $folder): bool|string
    {
        return $file->store($folder);
    }

    public function getFile()
    {
        return Storage::get($this->path);
    }
}
