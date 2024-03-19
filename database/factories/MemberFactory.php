<?php

namespace Database\Factories;

use App\Enums\MemberTypeEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Member>
 */
class MemberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'id_number' => fake()->randomNumber(5),
            'phone' => fake()->phoneNumber(),
            'company_id' => 1,
            'department_id' => 1,
            'room_id' => 1,
            'block_id' => 1,
            'roster' => '6X3',
            'camp_id' => 1,
            'section_id' => 1,
            'level' => 1,
            'engagement_date' => now(),
            'gender' => 'male',
            'cost_code' => '904060',
            'email' => 'sample@email.com',
        ];
    }
}
