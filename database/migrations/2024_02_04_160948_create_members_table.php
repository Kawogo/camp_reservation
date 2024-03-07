<?php

use App\Enums\MemberTypeEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     */
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('id_number');
            $table->string('type')->default(MemberTypeEnum::Temporary);
            $table->string('phone');
            $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete()->nullable();
            $table->foreignId('department_id')->constrained('departments')->cascadeOnDelete()->nullable();
            $table->foreignId('camp_id')->constrained('camps')->cascadeOnDelete()->nullable();
            $table->foreignId('block_id')->constrained('blocks')->cascadeOnDelete()->nullable();
            $table->foreignId('room_id')->cascadeOnDelete()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
