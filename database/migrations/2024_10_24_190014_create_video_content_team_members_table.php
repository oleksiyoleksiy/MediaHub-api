<?php

use App\Models\TeamMember;
use App\Models\VideoContent;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('video_content_team_members', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(VideoContent::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(TeamMember::class)->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('video_content_team_members');
    }
};
