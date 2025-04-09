import { Button } from '@/components/ui/button';
import { ChatHistory } from '@/pages/histories/types';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronRight } from 'lucide-react';

export const columns: ColumnDef<ChatHistory>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'created_at.diff',
        header: 'Created At',
    },
    {
        accessorKey: 'parser.name',
        header: 'Parser',
    },

    {
        header: 'Status',
    },

    {
        header: 'Action',
        cell: ({ row }) => {
            return (
                <Button variant="outline" size="icon">
                    <ChevronRight />
                </Button>
            );
        },
    },
];
