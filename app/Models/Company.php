<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'address'];

    public function members(): HasMany {
        return $this->hasMany(Member::class);
    }

    public function camps(): HasMany {
        return $this->hasMany(Camp::class);
    }

    public function departments(): HasMany {
        return $this->hasMany(Department::class);
    }
}
