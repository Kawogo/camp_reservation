<?php

namespace App\Models;

use App\Enums\RoomStatusEnum;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Collection;

class Room extends Model
{
    use HasFactory;

    protected $casts = ['status' => RoomStatusEnum::class];
    protected $fillable = ['number', 'block_id', 'status', 'capacity'];

    public function block(): BelongsTo {
        return $this->belongsTo(Block::class);
    }

    public function member(): HasOne {
        return $this->hasOne(Member::class);
    }

    public function checkins(): HasMany {
        return $this->hasMany(Checkin::class);
    }

    public function scopeAvailableRooms($query) {
       return $query->where('status', RoomStatusEnum::Open)->pluck('number', 'id');
    }
}
