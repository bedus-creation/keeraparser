<?php

use App\Actions\ChatInitiateAction;
use App\Data\ChatStoreDto;
use App\Domain\Parser\JsonParser;
use App\Filters\ParserFilter;
use App\Http\Requests\ChatRequest;
use App\Http\Requests\SchemaUpdateRequest;
use App\Http\Resources\Token;
use App\Models\Chat;
use App\Models\Parser;
use App\Models\Schema;
use App\Queries\ParserQuery;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Cashier\Cashier;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

Route::get('/', function () {
    return Inertia::render('index');
})->name('landing.index');

Route::middleware(['auth', 'verified', 'throttle:keera-api'])->group(function () {
    Route::get('billing/stripe/success', function (Request $request) {
        $sessionId = $request->get('session_id');

        if ($sessionId === null) {
            return;
        }

        $session = Cashier::stripe()->checkout->sessions->retrieve($sessionId);

        if ($session->payment_status !== 'paid') {
            return;
        }

        // TODO: send an invoice
        // User may refresh this page, invoice should be sent once

        $plan = $session['metadata']['plan'] ?? null;

        return inertia('payments/success', [
            'payment' => [
                'created_at'   => Carbon::parse($session->created)->format('Y-m-d'),
                'plan'         => $plan,
                'total_amount' => \Illuminate\Support\Number::currency($session->amount_total / 100)
            ],
        ]);
    })->name('billing.stripe.success');

    Route::get('billing', function (Request $request) {
        $plan = $request->input('plan');

        $planPrice = config('pricing.'.strtolower($plan));

        return request()->user()
            ->newSubscription($plan, $planPrice['stripe_product_price'])
            ->checkout([
                'success_url' => route('billing.stripe.success')."?session_id={CHECKOUT_SESSION_ID}",
                'cancel_url'  => route('billing.stripe.success'),
                'metadata'    => [
                    'plan' => $plan,
                ]
            ], []);
    })->name('billing');


    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('chats', function () {
        $parsers = ParserQuery::getParserList();

        return Inertia::render('chat/index', [
            'parsers' => $parsers,
        ]);
    })->name('dashboard');

    Route::get('chats/{id}', function (int $id) {
        $parsers = ParserQuery::getParserList();
        $chat    = Chat::query()->findOrFail($id);

        return Inertia::render('chat/index', [
            'chat'    => $chat,
            'parsers' => $parsers,
        ]);
    })->name('chats.show');

    Route::post('chats', function (ChatRequest $request, ChatInitiateAction $action) {
        $user         = auth()->user();
        $chatStoreDto = ChatStoreDto::from($request);

        $chat = $action
            ->prepare($user, $chatStoreDto)
            ->processSync()
            ->execute();

        return redirect()->to(route('chats.show', $chat->id));
    });

    Route::get('histories', function () {
        $chats = \App\Data\ChatDto::collect(
            Chat::query()
                ->with('parser')
                ->orderBy('id', 'desc')
                ->paginate()
        );

        $histories['data'] = $chats->items();
        unset($chats['data']);
        $histories['meta'] = $chats->toArray();

        return Inertia::render('histories/index', [
            'histories' => $histories,
            'params'    => request()->all(),
        ]);
    })->name('histories.index');

    Route::post('schemas', function (\App\Http\Requests\SchemaCreateRequest $request) {
        Schema::query()
            ->create($request->all());

        return redirect()->back();
    });

    Route::put('schemas/{id}', function (SchemaUpdateRequest $request, int $id) {
        // TODO: authorize the request
        Schema::query()
            ->where('id', $id)
            ->firstOrFail()
            ->update($request->all());

        return redirect()->back();
    });

    Route::delete('schemas/{id}', function ($id) {
        Schema::query()
            ->where('schema_id', $id)
            ->delete();

        Schema::query()
            ->where('id', $id)
            ->delete();

        return redirect()->back();
    });

    Route::get('parsers/{id}/forks', function ($id) {
        $parser = Parser::query()
            ->where('id', $id)
            ->firstOrFail();

        $schema = Schema::query()
            ->where('id', $parser->schema_id)
            ->firstOrFail();

        [$key, $json] = $schema->toArraySchema();
        $schemaId = (new JsonParser())->jsonToSchema($key, $json);

        /** @var Parser $replicateParser */
        $replicateParser             = $parser->replicate();
        $replicateParser->created_at = now();
        $replicateParser->user_id    = auth()->id();
        $replicateParser->schema_id  = $schemaId;
        $replicateParser->save();

        return redirect()->to(route('parsers.edit', $replicateParser->id));
    });

    Route::get('parsers/{id}/edit', function ($id) {
        $parser = Parser::query()
            ->with('schema')
            ->where('id', $id)
            ->firstOrFail();

        $schema = $parser->schema->toArraySchema();
        $json   = $parser->schema->toJsonSchema();

        return Inertia::render('parsers/edit', [
            'parser' => $parser,
            'json'   => $json,
            'schema' => [
                'title'      => $schema[0],
                'properties' => [],
                ...$schema[1],
            ],
        ]);
    })->name('parsers.edit');

    Route::get('parsers', function (Request $request) {
        $parsers = QueryBuilder::for(Parser::class)
            ->allowedFilters([
                AllowedFilter::custom('q', new ParserFilter),
            ])->where(function (\Illuminate\Database\Eloquent\Builder $query) {
                $query->where('user_id', auth()->id())
                    ->orWhereNull('user_id');
            })->paginate()
            ->appends(request()->all())
            ->toArray();

        $results['data'] = $parsers['data'];
        unset($parsers['data']);
        $results['pagination'] = $parsers;

        return Inertia::render('parsers/index', [
            'parsers' => $results,
            'params'  => $request->all()
        ]);
    });

    Route::post('/tokens/create', function (Request $request) {
        $token = $request->user()->createToken($request->input('name'));

        return response()->json(['token' => $token->plainTextToken]);
    })->name('tokens.create');

    Route::delete('/tokens/{id}', function (Request $request, string $id) {
        $request->user()->tokens()->where('id', $id)->delete();

        return redirect()->back();
    })->name('tokens.delete');

    Route::get('api-keys', function () {
        $tokens = auth()->user()->tokens;

        return Inertia::render('api-keys/index', [
            'apiKeys' => Token::collection($tokens),
        ]);
    })->name('api-keys.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
