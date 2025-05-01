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
        $schema = json_decode(file_get_contents(base_path('database/seeders/schema.json')), true);
        $schemaId = (new \App\Domain\Parser\JsonParser())->jsonToSchema('Candidate', $schema);

        $systemPrompt = <<<PROMPT
You are an expert resume parser. Your task is to extract structured resume data from raw text or OCR output, 
even when the resume layout or section headers vary. Use intelligent inference to recognize sections such as name,
contact, experience, education, and skills, regardless of format or order. Output must follow the exact JSON schema provided.
If a section is missing in the resume, return a null value or an empty list, not errors. Be robust against spelling variations 
and different formatting styles.
PROMPT;

        $userPrompt = <<<PROMPT
Below is the text extracted from a resume (either from digital PDF or OCR). Parse it and return the structured
information in the specified JSON format. Extract all relevant fields as accurately as possible, even if labels are 
unconventional or sections are out of order.
PROMPT;

        Parser::query()->updateOrCreate([
            'type' => 'resume',
        ], [
            'name'          => 'Resume Parser',
            'system_prompt' => $systemPrompt,
            'user_prompt'   => $userPrompt,
            'schema_id'     => $schemaId,
        ]);
    }
}
