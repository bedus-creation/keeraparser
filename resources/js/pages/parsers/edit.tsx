import { JsonSchemaEditor } from '@/components/json-schema-edit';
import AppLayout from '@/layouts/app-layout';
import { Parser, SchemaItem } from '@/pages/parsers/type';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
export default function ParserEdit({ parser, schema }: { schema: SchemaItem, parser: Parser }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Parsers',
            href: '/parsers',
        },
        {
            title: parser.name,
            href: '/parsers',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Keera document Parser Edit" />

            <main className="container mx-auto px-4 py-6 md:px-6">
                Json Schema
                <JsonSchemaEditor key={schema.id} initialSchema={schema}/>
            </main>
        </AppLayout>
    );
}
