<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DepartmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'nom' => ['required', 'string', 'max:255', Rule::unique('departments')->ignore($this->route('department'))],
            'localisation' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
        ];
    }

    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom du département est obligatoire.',
            'nom.unique' => 'Ce nom de département est déjà utilisé.',
            'nom.max' => 'Le nom ne doit pas dépasser 255 caractères.',
            'localisation.required' => 'La localisation est obligatoire.',
            'localisation.max' => 'La localisation ne doit pas dépasser 255 caractères.',
            'description.max' => 'La description ne doit pas dépasser 2 000 caractères.',
        ];
    }
}
