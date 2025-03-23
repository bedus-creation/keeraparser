<?php

namespace Database\Seeders;

use App\Models\Parser;
use App\Models\Schema;
use Illuminate\Database\Seeder;

class ParserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $schema = Schema::query()
            ->create([
                'name'        => 'Candidate',
                'description' => 'Candidate Profile',
                'type'        => 'object'
            ]);

        Parser::query()->create([
            'name'          => 'Resume Parser',
            'system_prompt' => 'You are a advance Resume Parser',
            'type'          => 'resume',
            'schema_id'     => $schema->id,
        ]);
    }
}
