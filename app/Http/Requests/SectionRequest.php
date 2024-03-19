<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SectionRequest extends FormRequest
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
            'name' => ['string', 'required', Rule::unique('sections', 'name')->where('department_id', $this->department_id)],
            'department_id' => 'integer|required',
        ];
    }

    public function messages()
    {
        return [
            'name.unique' => 'The section name has already been assigned to the selected department.'
        ];
    }
}
