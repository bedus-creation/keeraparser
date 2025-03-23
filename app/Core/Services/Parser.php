<?php

namespace App\Core\Services;

class Parser
{
    public static function parse(string $json)
    {
        $json = json_decode($json, true);

        foreach ($json as $key => $item) {

        }
    }
}
