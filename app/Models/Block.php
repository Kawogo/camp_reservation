<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Block extends Model
{
    use HasFactory;
    protected $fillable =['name', 'camp_id'];

    public function camp(): BelongsTo {
        return $this->belongsTo(Camp::class);
    }

    public function rooms(): HasMany {
        return $this->hasMany(Room::class);
    }

    public function members(): HasMany {
        return $this->hasMany(Member::class);
    }
}
