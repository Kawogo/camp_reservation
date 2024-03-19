<?php

namespace App\Http\Requests;

use App\Enums\MemberTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class MemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'room_id' => 'integer|required',
            'company_id' => 'integer|required',
            'department_id' => 'integer|required',
            'name' => 'string|required',
            'phone' => ['string', 'required', Rule::unique('members', 'phone')->ignore($this->member)],
            'id_number' => ['string', 'required', Rule::unique('members', 'id_number')->ignore($this->member)],
            'type' => ['required', new Enum(MemberTypeEnum::class)],
            'block_id' => 'integer|required',
            'camp_id' => 'integer|required',
            'section_id' => 'integer|required',
            'email' => 'string|required',
            'gender' => 'string|required',
            'cost_code' => 'string|required',
            'level' => 'string|required',
            'roster' => 'string|required',
            'engagement_date' => 'date|required',
        ];
    }
}
