<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('type', ['percentage', 'fixed']); // % atau nominal
            $table->decimal('value', 10, 2); // nilai diskon
            $table->decimal('min_transaction', 12, 2)->default(0); // minimal transaksi
            $table->decimal('max_discount', 10, 2)->nullable(); // maksimal diskon (untuk %)
            $table->json('applicable_types')->nullable(); // jenis transaksi yang berlaku
            $table->integer('usage_limit')->nullable(); // batas penggunaan
            $table->integer('used_count')->default(0); // jumlah sudah digunakan
            $table->datetime('valid_from');
            $table->datetime('valid_until');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('vouchers');
    }
};