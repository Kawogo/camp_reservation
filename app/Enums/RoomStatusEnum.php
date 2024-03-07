<?php

namespace App\Enums;


enum RoomStatusEnum: string 
{
    case Open = 'open';
    case Full = 'full';


    public function getLabel(): ?string
    {
        return match ($this) {
            self::Open => 'Open',
            self::Full => 'Full',
        };
    }
 
    public function getColor(): string|array|null
    {
        return match ($this) {
            self::Open => 'success',
            self::Full => 'danger',
        };
    }
}
