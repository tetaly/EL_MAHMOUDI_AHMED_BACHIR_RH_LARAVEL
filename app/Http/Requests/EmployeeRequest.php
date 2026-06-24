<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'department_id' => ['required', 'integer', 'exists:departments,id'],
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('employees')->ignore($this->route('employee'))],
            'fonction' => ['required', 'string', 'max:255'],
            'salaire' => ['required', 'numeric', 'min:0', 'max:9999999999.99'],
            'date_embauche' => ['required', 'date', 'before_or_equal:today'],
            'photo' => [$this->isMethod('post') ? 'required' : 'nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'department_id.required' => 'Le département est obligatoire.',
            'department_id.exists' => 'Le département sélectionné est invalide.',
            'nom.required' => 'Le nom est obligatoire.',
            'prenom.required' => 'Le prénom est obligatoire.',
            'email.required' => 'L’adresse e-mail est obligatoire.',
            'email.email' => 'L’adresse e-mail doit être valide.',
            'email.unique' => 'Cette adresse e-mail est déjà utilisée.',
            'fonction.required' => 'La fonction est obligatoire.',
            'salaire.required' => 'Le salaire est obligatoire.',
            'salaire.numeric' => 'Le salaire doit être un nombre.',
            'salaire.min' => 'Le salaire ne peut pas être négatif.',
            'date_embauche.required' => 'La date d’embauche est obligatoire.',
            'date_embauche.date' => 'La date d’embauche doit être une date valide.',
            'date_embauche.before_or_equal' => 'La date d’embauche ne peut pas être future.',
            'photo.required' => 'La photo est obligatoire.',
            'photo.image' => 'Le fichier doit être une image.',
            'photo.mimes' => 'La photo doit être au format JPG, PNG ou WEBP.',
            'photo.max' => 'La photo ne doit pas dépasser 2 Mo.',
        ];
    }
}
