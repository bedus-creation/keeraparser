<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('chats', function () {
        return Inertia::render('chat/index');
    })->name('dashboard');

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
        $parser = \App\Models\Parser::query()
            ->where('id', $id)
            ->firstOrFail();

        $schema = \App\Models\Schema::query()
            ->where('id', $parser->schema_id)
            ->firstOrFail();

        $schemaReplicate = $schema->replicate();
        $schemaReplicate->save();

        $replicateParser             = $parser->replicate();
        $replicateParser->created_at = now();
        $replicateParser->user_id    = auth()->id();
        $replicateParser->schema_id  = $schemaReplicate->id;
        $replicateParser->save();

        return redirect()->to(route('parsers.edit', $replicateParser->id));
    });

    Route::get('parsers/{id}/edit', function ($id) {
        $parser = \App\Models\Parser::query()
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
        $parsers = \App\Models\Parser::query()
            ->where('name', 'LIKE', '%' . $request->input('q') . '%')
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
