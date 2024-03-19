<?php

namespace App\Models;

use App\Enums\MemberTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Member extends Model
{
    use HasFactory;

    protected $fillable = ['room_id','company_id','department_id','name', 'phone','id_number','type', 'block_id', 'camp_id', 'email', 'gender', 'cost_code', 'level', 'roster', 'engagement_date', 'section_id'];

    protected $casts = ['type' => MemberTypeEnum::class, 'phone' => 'encrypted'];

    public function room(): BelongsTo {
        return $this->belongsTo(Room::class);
    }

    public function block(): BelongsTo {
        return $this->belongsTo(Block::class);
    }

    public function checkouts(): HasMany {
        return $this->hasMany(Checkout::class);
    }

    public function checkins(): HasMany {
        return $this->hasMany(Checkin::class);
    }

    public function company(): BelongsTo {
        return $this->belongsTo(Company::class);
    }

    public function department(): BelongsTo {
        return $this->belongsTo(Department::class);
    }

    public function camp(): BelongsTo {
        return $this->belongsTo(Camp::class);
    }

    public function section(): BelongsTo {
        return $this->belongsTo(Section::class);
    }
}
