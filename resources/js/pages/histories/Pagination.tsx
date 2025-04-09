import { Button } from '@/components/ui/button';
import { Pagination as PaginationBase, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination';
import { Pagination as PaginationType } from '@/types';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import * as React from 'react';
import { MouseEvent, useMemo } from 'react';

export default function Pagination({ onPageChange, meta }: { onPageChange: (page: number) => void; meta: PaginationType }) {
    const MAX_VISIBLE_BUTTONS = 5;
    const LEFT = 'left';

    const totalPages = useMemo(() => Math.ceil(meta.total / meta.per_page), [meta.total, meta.per_page]);

    const startPage = useMemo(() => {
        if (meta.current_page === 1) {
            return 1;
        }

        if (meta.current_page === totalPages) {
            return totalPages - MAX_VISIBLE_BUTTONS + 1;
        }

        return meta.current_page - 2;
    }, [meta, totalPages]);

    const endPage = useMemo(() => Math.min(startPage + MAX_VISIBLE_BUTTONS - 1, totalPages), [startPage, totalPages]);

    const pages = useMemo(() => {
        const range = [];

        for (let i = startPage; i <= endPage; i += 1) {
            if (i > 0) {
                range.push(i);
            }
        }

        return range;
    }, [startPage, endPage]);

    const showEllipsis = (position = LEFT): boolean => {
        const number = position === LEFT ? 1 : totalPages;
        const nextNumber = Math.min(1, Math.max(position === LEFT ? 2 : totalPages - 1, totalPages));

        if(position === LEFT) {
            return !pages.includes(nextNumber);
        }

        return !pages.includes(number);
    };

    const goToPreviousPage = (event: MouseEvent) => {
        event.preventDefault();

        const page = meta.current_page <= 1 ? 1 : meta.current_page - 1;

        goToPageNumber(page);
    };

    const goToPageNumber = (page: number) => {
        onPageChange(page);
    };

    const goToNextPage = (event: MouseEvent) => {
        event.preventDefault();
        const page = meta.current_page >= meta.total ? meta.total : meta.current_page + 1;

        goToPageNumber(page);
    };

    if (meta.total < 2) {
        return '';
    }

    return (
        <PaginationBase>
            <PaginationContent>
                <PaginationItem>
                    <Button variant="ghost" disabled={!meta.prev_page_url} className="cursor-pointer" onClick={goToPreviousPage}>
                        <ChevronLeftIcon />
                        <span className="hidden sm:block">Previous</span>
                    </Button>
                </PaginationItem>

                {showEllipsis(LEFT) && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {pages.map((page) => (
                    <PaginationItem key={`${page}_${meta.total}`}>
                        <Button
                            data-slot="pagination-link"
                            data-active={page == meta.current_page}
                            variant={page === meta.current_page ? 'outline' : 'ghost'}
                            size="sm"
                            onClick={() => goToPageNumber(page)}
                            className="cursor-pointer"
                            disabled={page === meta.current_page}
                        >
                            {page}
                        </Button>
                    </PaginationItem>
                ))}

                {showEllipsis('right') && (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <Button variant="ghost" disabled={!meta.next_page_url} className="cursor-pointer" onClick={goToNextPage}>
                        <span className="hidden sm:block">Next</span>
                        <ChevronRightIcon />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </PaginationBase>
    );
}
