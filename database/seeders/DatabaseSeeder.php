<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Block;
use App\Models\Camp;
use App\Models\Company;
use App\Models\Department;
use App\Models\Member;
use App\Models\Room;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@cms.com',
        ]);

        Company::factory()->create();
        Camp::factory()->create();
        Block::factory()->create();
        Room::factory()->create();
        Department::factory()->create();
        Member::factory()->create();
    }
}
