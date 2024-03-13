<?php

namespace App\Models;

use App\Enums\CheckinStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Checkin extends Model
{
    use HasFactory;

    protected $fillable = ['status', 'period_onsite', 'from_date', 'to_date', 'room_id', 'member_id'];

    protected $casts = ['status' => CheckinStatus::class];

    public function member(): BelongsTo {
        return $this->belongsTo(Member::class);
    }

    public function room(): BelongsTo {
        return $this->belongsTo(Room::class);
    }


    public function scopeIsActive(Builder $query, int $memberId){
        $query->where(['member_id' => $memberId, 'status' => CheckinStatus::Active->value])->first();
    }
}
