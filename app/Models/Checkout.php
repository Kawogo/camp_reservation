<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Checkout extends Model
{
    use HasFactory;

    protected $fillable = [
        'period_offsite',
        'leave_date',
        'return_date',
        'member_id',
    ];


    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }
}
