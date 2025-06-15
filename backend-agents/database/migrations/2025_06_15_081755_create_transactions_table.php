<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_code')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['bus_ticket', 'internet_quota', 'electricity_token', 'ewallet_topup', 'voucher_topup']);
            $table->enum('status', ['pending', 'processing', 'success', 'failed', 'cancelled'])->default('pending');
            $table->enum('payment_method', ['cash', 'midtrans'])->default('cash');
            $table->string('payment_reference')->nullable(); // Midtrans transaction ID
            $table->decimal('amount', 15, 2);
            $table->decimal('admin_fee', 10, 2)->default(0);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('total_amount', 15, 2);
            $table->foreignId('voucher_id')->nullable()->constrained()->onDelete('set null');
            $table->json('customer_data'); // Data customer (nama, phone, email, dll)
            $table->text('notes')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();
            
            $table->index(['user_id', 'type']);
            $table->index(['status', 'created_at']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('transactions');
    }
};