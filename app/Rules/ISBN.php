<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Components\ISBN as ISBNComponent;

class ISBN implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return ISBNComponent::normalizeReturnBoolean($value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return ':attributeは10桁か13桁のISBN規格で入力してください。';
    }
}
