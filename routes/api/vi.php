<?php

use Api\V1\HealthController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix'     => 'v1',
    'middleware' => 'auth:sanctum',
], function () {
    Route::get('/up', HealthController::class);
});
