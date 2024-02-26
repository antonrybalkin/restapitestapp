<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:60'],
            'email' => ['required', 'unique:users', 'string'],
            'phone' => ['required', 'unique:users', 'string'],
            'position_id' => ['required', 'integer', 'min:1'],
            'photo' => ['required', 'mimes:jpg,jpeg', 'max:5000'],
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors();

        throw new HttpResponseException(response()->json([
            "success" => false,
            "message" => "Validation failed",
            "fails" => $errors,
        ], 422));
    }
}
