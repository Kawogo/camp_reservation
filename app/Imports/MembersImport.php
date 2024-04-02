<?php

namespace App\Imports;

use App\Enums\MemberTypeEnum;
use App\Models\Block;
use App\Models\Camp;
use App\Models\Company;
use App\Models\Department;
use App\Models\Member;
use App\Models\Room;
use App\Models\Section;
use Carbon\Carbon;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class MembersImport implements ToModel, WithHeadingRow, WithValidation
{
    private $rooms, $companies, $departments, $blocks, $camps, $sections;



    public function __construct()
    {
        $this->rooms = Room::select('id', 'number')->get();
        $this->companies = Company::select('id', 'name')->get();
        $this->departments = Department::select('id', 'name')->get();
        $this->blocks = Block::select('id', 'name')->get();
        $this->camps = Camp::select('id', 'name')->get();
        $this->sections = Section::select('id', 'name')->get();
    }


    public function prepareForValidation($data, $index)
    {

        // dd($data);
        $new_data = [];

        $new_data['room_id'] = $this->rooms->where('number', $data['room'])->first()->id;
        $new_data['company_id'] = $this->companies->where('name', $data['company'])->first()->id;
        $new_data['department_id'] = $this->departments->where('name', $data['department'])->first()->id;
        $new_data['block_id'] = $this->blocks->where('name', $data['block'])->first()->id;
        $new_data['camp_id'] = $this->camps->where('name', $data['camp'])->first()->id;
        $new_data['section_id'] = $this->sections->where('name', $data['section'])->first()->id;
        $new_data['engagement_date'] = Date::excelToDateTimeObject($data['engagement_date']);

        // renaming the codes
        $data['id_number'] = $data['number'];
        $data['cost_code'] = $data['code'];
        unset($data['number']);
        unset($data['code']);

        return array_merge($data, $new_data);
    }

    public function rules(): array
    {
        return [
            'room_id' => 'integer|required',
            'company_id' => 'integer|required',
            'department_id' => 'integer|required',
            'name' => 'string|required',
            'phone' => ['numeric', 'required', Rule::unique('members', 'phone')],
            'id_number' => ['numeric', 'required', Rule::unique('members', 'id_number')],
            'type' => ['required', new Enum(MemberTypeEnum::class)],
            'block_id' => 'integer|required',
            'camp_id' => 'integer|required',
            'section_id' => 'integer|required',
            'email' => 'string|required',
            'gender' => 'string|required',
            'cost_code' => 'integer|required',
            'level' => 'numeric|required',
            'roster' => 'string|required',
            'engagement_date' => 'date|required',
        ];
    }

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Member([
            'room_id' => $row['room'],
            'company_id' => $row['company'],
            'department_id' => $row['department'],
            'name' => $row['name'],
            'phone' => $row['phone'],
            'id_number' => $row['number'],
            'type' => $row['type'],
            'block_id' => $row['block'],
            'camp_id' => $row['camp'],
            'email' => $row['email'],
            'gender' => $row['gender'],
            'cost_code' => $row['code'],
            'level' => $row['level'],
            'roster' => $row['roster'],
            'engagement_date' => $row['engagement_date'],
            'section_id' => $row['section']
        ]);
    }
}
