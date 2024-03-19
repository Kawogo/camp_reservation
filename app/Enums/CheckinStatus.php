<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum CheckinStatus: string 
{
    case Active = 'active';
    case Pending = 'pending';
    case Closed = 'closed';

    public static function getLabel(CheckinStatus $status): ?string
    {
        return match ($status) {
            self::Active => 'Active',
            self::Pending => 'Pending',
            self::Closed => 'Closed',
        };
    }
 
}