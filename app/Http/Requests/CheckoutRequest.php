<?php

namespace App\Http\Requests;

use App\Enums\CheckinStatus;
use App\Models\Checkin;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CheckoutRequest extends FormRequest
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
            // 'room_id' => 'required|int',
            'period_offsite' => 'integer|required',
            'leave_date' => 'date|required',
            'return_date' => 'date|required|after:leave_date',
            'member_id' => ['integer','required'],
        ];
    }

    protected function prepareForValidation()
    {
        $fromDate = \Carbon\Carbon::parse($this->leave_date);
        $toDate = \Carbon\Carbon::parse($this->return_date);
        $this->merge(['period_offsite' => $toDate->diffInDays($fromDate) + 1]);
    }


    public function messages()
    {
        return [
            'member_id.unique' => 'Member already checked out on that room.',
        ];
    }
}
