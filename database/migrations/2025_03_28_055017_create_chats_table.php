<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->string('status')->default('pending')->comment('pending,processing,completed,failed');
            $table->jsonb('payload')->nullable();
            $table->timestamp('response_completed_at')->nullable();
            $table->jsonb('response')->nullable();

            $table->foreignId('parser_id')->constrained('parsers');
            $table->foreignId('user_id')->nullable()->constrained('users');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chats');
    }
};
