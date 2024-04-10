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

        $data['id_number'] = $data['number'];
        $data['cost_code'] = $data['code'];
        $data['room_id'] = $data['room'];
        $data['company_id'] = $data['company'];
        $data['department_id'] = $data['department'];
        $data['block_id'] = $data['block'];
        $data['camp_id'] = $data['camp'];
        $data['section_id'] = $data['section'];
        unset($data['number']);
        unset($data['code']);
        unset($data['room']);
        unset($data['company']);
        unset($data['department']);
        unset($data['block']);
        unset($data['camp']);
        unset($data['section']);


        $data['room_id'] = $this->rooms->where('number', $data['room_id'])->first()->id;
        $data['company_id'] = $this->companies->where('name', $data['company_id'])->first()->id;
        $data['department_id'] = $this->departments->where('name', $data['department_id'])->first()->id;
        $data['block_id'] = $this->blocks->where('name', $data['block_id'])->first()->id;
        $data['camp_id'] = $this->camps->where('name', $data['camp_id'])->first()->id;
        $data['section_id'] = $this->sections->where('name', $data['section_id'])->first()->id;
        $data['engagement_date'] = Date::excelToDateTimeObject($data['engagement_date']);


        return $data;
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
            'room_id' => $row['room_id'],
            'company_id' => $row['company_id'],
            'department_id' => $row['department_id'],
            'name' => $row['name'],
            'phone' => $row['phone'],
            'id_number' => $row['id_number'],
            'type' => $row['type'],
            'block_id' => $row['block_id'],
            'camp_id' => $row['camp_id'],
            'email' => $row['email'],
            'gender' => $row['gender'],
            'cost_code' => $row['cost_code'],
            'level' => $row['level'],
            'roster' => $row['roster'],
            'engagement_date' => $row['engagement_date'],
            'section_id' => $row['section_id']
        ]);
    }
}
