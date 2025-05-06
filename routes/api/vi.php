<?php

use Api\V1\Controllers\HealthController;
use Api\V1\Controllers\ParserParseController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'v1',
    'middleware' => ['auth:sanctum', 'throttle:keera-api'],
    'name' => 'api.v1.',
], function () {
    Route::get('/up', HealthController::class);

    Route::post('/parsers/{id}/parse', ParserParseController::class)
        ->name('parsers.parse');

    // TODO: include parsers routes
    // Route::apiResource('parsers', Api\V1\Controllers\ParserController::class);
});
