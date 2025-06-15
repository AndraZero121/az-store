<?php
// routes/api.php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\BusTicketController;
use App\Http\Controllers\Api\InternetQuotaController;
use App\Http\Controllers\Api\ElectricityTokenController;
use App\Http\Controllers\Api\EwalletTopupController;
use App\Http\Controllers\Api\VoucherTopupController;
use App\Http\Controllers\Api\VoucherController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\ReportController;

// Public Routes
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
});

// Public Master Data
Route::get('cities', [CityController::class, 'index']);
Route::get('cities/provinces', [CityController::class, 'provinces']);
Route::get('cities/province/{province}', [CityController::class, 'byProvince']);
Route::get('cities/search', [CityController::class, 'search']);

Route::get('vouchers/available', [VoucherController::class, 'index']);
Route::get('vouchers/{code}', [VoucherController::class, 'show']);

// Protected Routes (Require Authentication)
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth Routes
    Route::prefix('auth')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('profile', [AuthController::class, 'profile']);
        Route::put('profile', [AuthController::class, 'updateProfile']);
        Route::put('change-password', [AuthController::class, 'changePassword']);
    });

    // Dashboard Routes
    Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'index']);
        Route::get('stats', [DashboardController::class, 'stats']);
        Route::get('monthly-transactions', [DashboardController::class, 'monthlyTransactions']);
        Route::get('recent-transactions', [DashboardController::class, 'recentTransactions']);
        Route::get('balance', [DashboardController::class, 'balance']);
    });

    // Transaction Routes
    Route::prefix('transactions')->group(function () {
        Route::get('/', [TransactionController::class, 'index']);
        Route::get('history', [TransactionController::class, 'history']);
        Route::get('summary', [TransactionController::class, 'summary']);
        Route::get('{id}', [TransactionController::class, 'show']);
        Route::put('{id}/cancel', [TransactionController::class, 'cancel']);
        Route::get('{id}/receipt', [TransactionController::class, 'receipt']);
    });

    // Bus Ticket Routes
    Route::prefix('bus-tickets')->group(function () {
        Route::get('routes', [BusTicketController::class, 'routes']);
        Route::get('search', [BusTicketController::class, 'search']);
        Route::post('book', [BusTicketController::class, 'book']);
        Route::put('{transactionId}/confirm', [BusTicketController::class, 'confirm']);
        Route::put('{transactionId}/cancel', [BusTicketController::class, 'cancel']);
        Route::get('tickets', [BusTicketController::class, 'tickets']);
    });

    // Internet Quota Routes
    Route::prefix('internet-quota')->group(function () {
        Route::get('providers', [InternetQuotaController::class, 'providers']);
        Route::get('providers/{providerId}/packages', [InternetQuotaController::class, 'packages']);
        Route::post('purchase', [InternetQuotaController::class, 'purchase']);
        Route::put('{transactionId}/confirm', [InternetQuotaController::class, 'confirm']);
        Route::get('history', [InternetQuotaController::class, 'history']);
    });

    // Electricity Token Routes
    Route::prefix('electricity-token')->group(function () {
        Route::get('denominations', [ElectricityTokenController::class, 'denominations']);
        Route::post('inquiry', [ElectricityTokenController::class, 'inquiry']);
        Route::post('purchase', [ElectricityTokenController::class, 'purchase']);
        Route::put('{transactionId}/confirm', [ElectricityTokenController::class, 'confirm']);
        Route::get('history', [ElectricityTokenController::class, 'history']);
    });

    // E-Wallet Topup Routes
    Route::prefix('ewallet-topup')->group(function () {
        Route::get('providers', [EwalletTopupController::class, 'providers']);
        Route::get('providers/{providerId}/denominations', [EwalletTopupController::class, 'denominations']);
        Route::post('inquiry', [EwalletTopupController::class, 'inquiry']);
        Route::post('topup', [EwalletTopupController::class, 'topup']);
        Route::put('{transactionId}/confirm', [EwalletTopupController::class, 'confirm']);
        Route::get('history', [EwalletTopupController::class, 'history']);
    });

    // Voucher Topup Routes
    Route::prefix('voucher-topup')->group(function () {
        Route::get('types', [VoucherTopupController::class, 'types']);
        Route::get('types/{typeId}/denominations', [VoucherTopupController::class, 'denominations']);
        Route::post('purchase', [VoucherTopupController::class, 'purchase']);
        Route::put('{transactionId}/confirm', [VoucherTopupController::class, 'confirm']);
        Route::get('history', [VoucherTopupController::class, 'history']);
    });

    // Voucher (Discount) Routes
    Route::prefix('vouchers')->group(function () {
        Route::post('validate', [VoucherController::class, 'validate']);
        Route::post('apply', [VoucherController::class, 'apply']);
        Route::get('my-vouchers', [VoucherController::class, 'myVouchers']);
    });

    // Report Routes
    Route::prefix('reports')->group(function () {
        Route::get('dashboard', [ReportController::class, 'dashboard']);
        Route::get('transactions', [ReportController::class, 'transactions']);
        Route::get('bus-tickets', [ReportController::class, 'busTickets']);
        Route::get('internet-quota', [ReportController::class, 'internetQuota']);
        Route::get('electricity-token', [ReportController::class, 'electricityToken']);
        Route::get('ewallet-topup', [ReportController::class, 'ewalletTopup']);
        Route::get('voucher-topup', [ReportController::class, 'voucherTopup']);
        Route::get('summary', [ReportController::class, 'summary']);
        Route::post('export/pdf', [ReportController::class, 'exportPdf']);
        Route::post('export/excel', [ReportController::class, 'exportExcel']);
    });
});