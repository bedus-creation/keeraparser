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
        Schema::create('schema', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('schema_id')->nullable();
            $table->string('name');
            $table->boolean('required')->default(false)->after('type');
            $table->text('description')->nullable();
            $table->string('type')->default('string');
            $table->jsonb('enum')->nullable();
            $table->jsonb('items')->nullable();
            $table->timestamps();
        });

        Schema::create('parsers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('system_prompt')->nullable();
            $table->longText('user_prompt')->nullable();
            $table->foreignId('schema_id')->constrained('schema');
            $table->string('type')->default('default');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schema');
        Schema::dropIfExists('parsers');
    }
};
