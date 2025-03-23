import { JsonSchemaEditor } from '@/components/json-schema-edit';
import AppLayout from '@/layouts/app-layout';
import { JsonSchema, Parser } from '@/pages/parsers/type';
import { Head } from '@inertiajs/react';
export default function ParserEdit({ parser, schema }: { schema: JsonSchema, parser: Parser }) {
    return (
        <AppLayout>
            <Head title="Keera document Parser Edit" />

            <main className="container mx-auto px-4 py-6 md:px-6">
                Json Schema
                <JsonSchemaEditor key={schema.id} initialSchema={schema}/>
            </main>
        </AppLayout>
    );
}
