<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('province');
            $table->string('code', 10)->unique(); // kode kota
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index(['province', 'is_active']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('cities');
    }
};