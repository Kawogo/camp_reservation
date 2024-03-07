<?php

namespace App\Http\Requests;

use App\Enums\CheckinStatus;
use App\Models\Checkin;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class CheckinRequest extends FormRequest
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
            'status' => ['required', new Enum(CheckinStatus::class)],
            'period_onsite' => 'integer|required',
            'from_date' => 'date|required',
            'to_date' => 'date|required|after:from_date',
            'room_id' => 'integer|required',
            'member_id' => ['integer','required', Rule::unique('checkins')->where('status', CheckinStatus::Active->value)],
        ];
    }

    protected function prepareForValidation()
    {
        $fromDate = \Carbon\Carbon::parse($this->from_date);
        $toDate = \Carbon\Carbon::parse($this->to_date);
        $this->merge(['period_onsite' => $toDate->diffInDays($fromDate) + 1]);
    }

    public function messages()
    {
        return [
            'member_id.unique' => 'Checkin for selected member already exists and active.',
        ];
    }
}
