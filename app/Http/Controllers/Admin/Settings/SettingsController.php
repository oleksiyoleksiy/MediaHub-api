<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\SettingsRequest;
use App\Http\Resources\SettingsResource;
use App\Models\Settings;
use App\Services\Settings\SettingsService;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function __construct(private SettingsService $service) {}

    public function index()
    {
        $settings = $this->service->index();

        return SettingsResource::collection($settings);
    }

    public function store(SettingsRequest $request)
    {
        $data = $request->validated();

        $settings = $this->service->store($data);

        return SettingsResource::make($settings);
    }

    public function update(SettingsRequest $request, Settings $setting)
    {
        $data = $request->validated();

        $settings = $this->service->update($data, $setting);

        return SettingsResource::make($settings);
    }

    public function destroy(Settings $setting)
    {
        $setting->delete();

        return response()->noContent();
    }
}
