<?php

namespace Database\Seeders;

use App\Models\Positions as ModelsPositions;
use Illuminate\Database\Seeder;

class Positions extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ModelsPositions::insertOrIgnore([["name" => "Security"], ['name' => 'Designer'], ['name' => 'Content manager'], ['name' => 'Lawyer']]);
    }
}
