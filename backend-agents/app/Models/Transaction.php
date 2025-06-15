<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_code',
        'user_id',
        'type',
        'status',
        'payment_method',
        'payment_reference',
        'amount',
        'admin_fee',
        'discount',
        'total_amount',
        'voucher_id',
        'customer_data',
        'notes',
        'processed_at',
    ];

    protected $casts = [
        'customer_data' => 'array',
        'processed_at' => 'datetime',
        'amount' => 'decimal:2',
        'admin_fee' => 'decimal:2',
        'discount' => 'decimal:2',
        'total_amount' => 'decimal:2',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function voucher()
    {
        return $this->belongsTo(Voucher::class);
    }

    public function details()
    {
        return $this->hasMany(TransactionDetail::class);
    }

    // Scopes
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }

    // Accessors
    public function getTypeNameAttribute()
    {
        $types = [
            'bus_ticket' => 'Tiket Bus',
            'internet_quota' => 'Kuota Internet',
            'electricity_token' => 'Token Listrik',
            'ewallet_topup' => 'Topup E-Wallet',
            'voucher_topup' => 'Topup Voucher',
        ];

        return $types[$this->type] ?? $this->type;
    }

    public function getStatusNameAttribute()
    {
        $statuses = [
            'pending' => 'Menunggu',
            'processing' => 'Diproses',
            'success' => 'Berhasil',
            'failed' => 'Gagal',
            'cancelled' => 'Dibatalkan',
        ];

        return $statuses[$this->status] ?? $this->status;
    }
}