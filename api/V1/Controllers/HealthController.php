<?php

namespace Api\V1\Controllers;

use App\Http\Controllers\Controller;

class HealthController extends Controller
{
    public function __invoke(): \Illuminate\Http\Response
    {
        return response()->noContent();
    }
}
