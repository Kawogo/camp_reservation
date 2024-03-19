<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'company_id'];

    public function members(): HasMany {
        return $this->hasMany(Member::class);
    }


    public function sections(): HasMany {
        return $this->hasMany(Section::class);
    }
    
    public function company(): BelongsTo {
        return $this->belongsTo(Company::class);
    }
}
