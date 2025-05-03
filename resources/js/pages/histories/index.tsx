import AppLayout from '@/layouts/app-layout';
import { columns } from '@/pages/histories/columns';
import { DataTable } from '@/pages/histories/datatable';
import { ChatHistory } from '@/pages/histories/types';
import { type BreadcrumbItem, Pagination } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Histories',
        href: '/histories',
    },
];

export default function Histories({ histories }: { histories: { data: ChatHistory[]; meta: Pagination } }) {
    const params = (usePage()['props'].params || { q: '', page: 1 }) as {
        q: string;
        page: number;
    };

    const onPageChange = (page: number) => {
        router.reload({
            only: ['histories'],
            data: {
                ...params,
                page: page,
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chat Histories | Keera document Parser" />

            <main className="container mx-auto px-4 py-6 md:px-6">
                <DataTable columns={columns} data={histories.data} meta={histories.meta} onPageChange={onPageChange} />
            </main>
        </AppLayout>
    );
}
