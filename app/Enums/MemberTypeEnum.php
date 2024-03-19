<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum MemberTypeEnum: string
{
    case Permanent = 'permanent';
    case Temporary = 'tempo';
    case Visitor = 'visitor';

    public function getLabel(): ?string
    {
        return $this->name;
    }
}
