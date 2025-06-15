<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Voucher extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'description',
        'type',
        'value',
        'min_transaction',
        'max_discount',
        'applicable_types',
        'usage_limit',
        'used_count',
        'valid_from',
        'valid_until',
        'is_active',
    ];

    protected $casts = [
        'applicable_types' => 'array',
        'value' => 'decimal:2',
        'min_transaction' => 'decimal:2',
        'max_discount' => 'decimal:2',
        'valid_from' => 'datetime',
        'valid_until' => 'datetime',
        'is_active' => 'boolean',
    ];

    // Relationships
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeValid($query)
    {
        $now = Carbon::now();
        return $query->where('valid_from', '<=', $now)
                    ->where('valid_until', '>=', $now);
    }

    public function scopeAvailable($query)
    {
        return $query->where(function($q) {
            $q->whereNull('usage_limit')
              ->orWhereColumn('used_count', '<', 'usage_limit');
        });
    }

    // Methods
    public function isValidForTransaction($transactionType, $amount)
    {
        // Check if voucher is active and valid
        if (!$this->is_active || !$this->isValidDate()) {
            return false;
        }

        // Check minimum transaction
        if ($amount < $this->min_transaction) {
            return false;
        }

        // Check applicable types
        if ($this->applicable_types && !in_array($transactionType, $this->applicable_types)) {
            return false;
        }

        // Check usage limit
        if ($this->usage_limit && $this->used_count >= $this->usage_limit) {
            return false;
        }

        return true;
    }

    public function isValidDate()
    {
        $now = Carbon::now();
        return $this->valid_from <= $now && $this->valid_until >= $now;
    }

    public function calculateDiscount($amount)
    {
        if ($this->type === 'percentage') {
            $discount = ($amount * $this->value) / 100;
            return $this->max_discount ? min($discount, $this->max_discount) : $discount;
        }

        return $this->value;
    }
}