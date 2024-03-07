<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum MemberTypeEnum: string
{
    case Permanent = 'permanent';
    case Temporary = 'tempo';

    public function getLabel(): ?string
    {
        return $this->name;
    }
}
