<?php

namespace App\Services\Settings;

use App\Models\Settings;

class SettingsService
{
    public function index()
    {
        return Settings::all();
    }

    public function store(array $data)
    {
        return Settings::create($data);
    }

    public function update(array $data, Settings $settings)
    {
        $settings->update($data);

        return $settings->refresh();
    }

    public function destroy(Settings $settings)
    {
        $settings->delete();
    }
}
