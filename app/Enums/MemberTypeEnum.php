<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum MemberTypeEnum: string
{
    case Permanent = 'permanent';
    case Temporary = 'tempo';
    case Visitor = 'visitor';

    public static function getLabel(MemberTypeEnum $type): ?string
    {
        return match ($type) {
            self::Permanent => 'Permanent',
            self::Temporary => 'Temporary',
            self::Visitor => 'Visitor',
        };
    }
}
