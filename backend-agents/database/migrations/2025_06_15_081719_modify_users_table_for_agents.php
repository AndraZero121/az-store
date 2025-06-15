<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('agent_code')->unique()->after('id');
            $table->string('phone')->nullable()->after('email');
            $table->text('address')->nullable()->after('phone');
            $table->decimal('balance', 15, 2)->default(0)->after('address');
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active')->after('balance');
            $table->timestamp('last_transaction')->nullable()->after('status');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['agent_code', 'phone', 'address', 'balance', 'status', 'last_transaction']);
        });
    }
};