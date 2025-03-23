import AppLayout from '@/layouts/app-layout';
import { Parser } from '@/pages/parsers/type';
import { Auth, Pagination } from '@/types';
import { Head, Link } from '@inertiajs/react';

type ParserPaginate = { data: Parser[]; pagination: Pagination };

export default function Parsers({ parsers, auth }: { parsers: ParserPaginate; auth: Auth }) {
    return (
        <AppLayout>
            <Head title="Keera document Parser" />
            <main className="container mx-auto px-4 py-6 md:px-6">
                {parsers.data.map((parser) => (
                    <div key={parser.id}>
                        {parser.name}

                        {parser.user_id === auth.user.id ? (
                            <Link href={`/parsers/${parser.id}/edit`}>Edit</Link>
                        ) : (
                            <Link href={`/parsers/${parser.id}/forks`}>Fork</Link>
                        )}
                    </div>
                ))}
            </main>
        </AppLayout>
    );
}
