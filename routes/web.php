<?php

use App\Http\Requests\ChatRequest;
use App\Jobs\ChatProcessJob;
use App\Models\Chat;
use App\Models\Parser;
use App\Queries\ParserQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('index');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
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

    Route::post('chats', function (ChatRequest $request) {
        $chat = Chat::query()->create([
            'user_id'     => auth()->id(),
            'parser_type' => 'resume',
            'parser_id'   => $request->integer('parser_id'),
        ]);

        $files = $request->file('files') ?? [];

        foreach ($files as $file) {
            $chat->addMedia($file)->toMediaCollection();
        }

        ChatProcessJob::dispatch($chat->id);

        return redirect()->to(route('chats.show', $chat->id));
    });

    Route::get('histories', function () {
        $chats             = \App\Data\ChatData::collect(
            Chat::query()
                ->with('parser')
                ->orderBy('id', 'desc')->paginate()
        );
        $histories['data'] = $chats->items();
        unset($chats['data']);
        $histories['meta'] = $chats->toArray();

        return Inertia::render('histories/index', [
            'histories' => $histories,
            'params'    => request()->all(),
        ]);
    })->name('histories.index');

    Route::post('schemas', function (Request $request) {
        \App\Models\Schema::query()
            ->create($request->all());

        return redirect()->back();
    });

    Route::delete('schemas/{id}', function ($id) {
        \App\Models\Schema::query()
            ->where('schema_id', $id)
            ->delete();

        \App\Models\Schema::query()
            ->where('id', $id)
            ->delete();

        return redirect()->back();
    });

    Route::get('parsers/{id}/forks', function ($id) {
        $parser = Parser::query()
            ->where('id', $id)
            ->firstOrFail();

        $schema = \App\Models\Schema::query()
            ->where('id', $parser->schema_id)
            ->firstOrFail();

        $schemaReplicate = $schema->replicate();
        $schemaReplicate->save();

        /** @var Parser $replicateParser */
        $replicateParser             = $parser->replicate();
        $replicateParser->created_at = now();
        $replicateParser->user_id    = auth()->id();
        $replicateParser->schema_id  = $schemaReplicate->id;
        $replicateParser->save();

        return redirect()->to(route('parsers.edit', $replicateParser->id));
    });

    Route::get('parsers/{id}/edit', function ($id) {
        $parser = Parser::query()
            ->with('schema')
            ->where('id', $id)
            ->firstOrFail();

        $schema = $parser->schema->toArraySchema();

        return Inertia::render('parsers/edit', [
            'parser' => $parser,
            'schema' => [
                'title'      => $schema[0],
                'properties' => [],
                ...$schema[1],
            ],
        ]);
    })->name('parsers.edit');

    Route::get('parsers', function (Request $request) {
        $parsers = Parser::query()
            ->where('name', 'LIKE', '%'.$request->input('q').'%')
            ->paginate(10)
            ->toArray();

        $results['data'] = $parsers['data'];
        unset($parsers['data']);
        $results['pagination'] = $parsers;

        return Inertia::render('parsers/index', [
            'parsers' => $results,
            'params'  => $request->all()
        ]);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
