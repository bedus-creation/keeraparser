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
        cell: () => {
            return (
                <Button variant="outline" size="icon">
                    <ChevronRight />
                </Button>
            );
        },
    },
];
