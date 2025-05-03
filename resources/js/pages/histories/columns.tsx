import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChatHistory } from '@/pages/histories/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';

export type KeeraColumnDef<TData, TValue = string | number | null | undefined | boolean> = ColumnDef<TData, TValue> & {
    meta?: {
        className?: string;
    };
};

export const columns: KeeraColumnDef<ChatHistory>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'parser.name',
        header: 'Parser Name',
    },
    {
        accessorKey: 'created_at.diff',
        header: 'Created At',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },

    {
        accessorKey: 'response_completed_at.diff',
        header: 'Completed at',
    },

    {
        header: 'Action',
        cell: ({ row }) => {
            const id = row.original.id;

            return (
                <Link
                    href={`/chats/${id}`}
                    className={cn(
                        buttonVariants({
                            size: 'sm',
                            variant: 'outline',
                        }),
                    )}
                >
                    <Eye />
                </Link>
            );
        },
        meta: {
            className: 'text-center',
        },
    },
];
