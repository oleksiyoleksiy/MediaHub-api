<?php

namespace App\Observers;

use App\Models\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileObserver
{
    /**
     * Handle the File "created" event.
     */
    public function created(File $file): void
    {

    }

    public function creating(File $file)
    {
        
    }

    /**
     * Handle the File "updated" event.
     */
    public function updated(File $file): void
    {
        //
    }

    /**
     * Handle the File "deleted" event.
     */
    public function deleted(File $file): void
    {
        Storage::delete($file->path);
    }

    /**
     * Handle the File "restored" event.
     */
    public function restored(File $file): void
    {
        //
    }

    /**
     * Handle the File "force deleted" event.
     */
    public function forceDeleted(File $file): void
    {
        //
    }
}
