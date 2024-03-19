<?php

namespace App\Exports;

use App\Enums\CheckinStatus;
use App\Enums\MemberTypeEnum;
use App\Models\Checkin;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class CheckinsExport implements FromCollection, WithMapping, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Checkin::with(
            [
                'member:id,name,phone,id_number,type,email,gender,cost_code,level,roster,engagement_date,department_id,camp_id,block_id,section_id',
                'member.department:id,name',
                'member.section:id,name',
                'member.camp:id,name',
                'member.block:id,name',
                'room:id,number',
            ]
        )->get(['status', 'period_onsite', 'from_date', 'to_date', 'room_id', 'member_id']);
    }

    public function map($checkin): array
    {
        return [
            $checkin->member->name,
            $checkin->member?->department?->name,
            $checkin->member?->section?->name,
            MemberTypeEnum::getLabel($checkin->member?->type),
            $checkin->member?->phone,
            $checkin->member?->id_number,
            $checkin->member?->email,
            $checkin->member?->gender,
            $checkin->member?->cost_code,
            $checkin->member?->level,
            $checkin->member?->roster,
            $checkin->member?->engagement_date,
            $checkin->member?->camp?->name,
            $checkin->member?->block?->name,
            $checkin->room->number,
            $checkin->from_date,
            $checkin->to_date,
            CheckinStatus::getLabel($checkin->status),
            $checkin->period_onsite,
        ];
    }


    public function headings(): array
    {
        return [
            'Member Name',
            'Department',
            'Section',
            'Type',
            'Phone',
            'Number',
            'Email',
            'Gender',
            'Code',
            'Level',
            'Roster',
            'Engagement Date',
            'Camp',
            'Block',
            'Room',
            'From Date',
            'To Date',
            'Status',
            'Period Onsite',
        ];
    }
}
