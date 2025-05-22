<?php

namespace App\Providers;

use App\Models\PersonalAccessToken;
use Dedoc\Scramble\Scramble;
use Dedoc\Scramble\Support\Generator\OpenApi;
use Dedoc\Scramble\Support\Generator\SecurityScheme;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);

        Gate::define('viewApiDocs', function ($user) {
            return true; // Everyone can view the api documents
        });

        Scramble::configure()
            ->withDocumentTransformers(function (OpenApi $openApi) {
                $url = route('api-keys.index');
                $openApi->secure(
                    SecurityScheme::http('bearer')
                        ->setDescription("If you don’t have an API key, please visit {$url} to generate one.")
                );
            });

        RateLimiter::for('keera-api', function (Request $request) {
            $ratePerMinute = $request->user()->getSubscriptionPlan()->getAPIRateLimitPerMinute();

            return Limit::perMinute($ratePerMinute)->by($request->user()?->id ?: $request->ip());
        });
    }
}
