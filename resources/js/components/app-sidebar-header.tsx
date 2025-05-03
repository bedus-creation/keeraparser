import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const auth = (usePage().props).auth as {
        plan: {
            on_trail: false;
            name: string;
        }
    };

    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex w-full items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />

                <div className="flex flex-1 justify-end">
                    { auth.plan.on_trail && <div className="absolute top-2 right-2 z-40 flex items-center justify-center">
                        <Link
                            href="/#pricing"
                            className="inline-flex h-12 cursor-default items-center justify-center gap-1.5 rounded-xl border border-red-500 bg-white px-1.5 py-1 text-red-500 transition-colors hover:bg-red-500/5 dark:border-red-400 dark:bg-[--main-dark-color] dark:text-red-400 dark:hover:bg-red-500/10">
                            <svg
                                className="h-6 w-6"
                                width="18px"
                                height="18px"
                                viewBox="0 0 18 18"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.788 4.5H15.25C16.215 4.5 17 5.282 17 6.25C17 7.218 16.215 8 15.25 8H2.75C1.785 8 1 7.224 1 6.25C1 5.276 1.785 4.5 2.75 4.5H3.212C3.077 4.193 3 3.856 3 3.5C3 2.122 4.121 1 5.5 1C7.261 1 8.364 2.232 9 3.339C9.636 2.231 10.739 1 12.5 1C13.879 1 15 2.122 15 3.5C15 3.856 14.923 4.193 14.788 4.5ZM13.5 3.5C13.5 2.949 13.052 2.5 12.5 2.5C11.257 2.5 10.486 3.64 10.081 4.5H12.5C13.052 4.5 13.5 4.051 13.5 3.5ZM5.5 2.5C4.948 2.5 4.5 2.949 4.5 3.5C4.5 4.051 4.948 4.5 5.5 4.5H7.915C7.507 3.64 6.734 2.5 5.5 2.5Z"
                                    fill="currentColor"
                                ></path>
                                <path d="M3 9.5V14.25C3 15.767 4.233 17 5.75 17H8.25V9.5H3Z" fill="currentColor"></path>
                                <path d="M9.75 9.5V17H12.25C13.767 17 15 15.767 15 14.25V9.5H9.75Z" fill="currentColor"></path>
                            </svg>
                            <span className="inline-flex flex-col items-start justify-start text-left">
                                <span className="hidden text-base font-bold sm:block">Buy a license</span>
                                <span className="text-sm font-bold sm:hidden">Buy now</span>
                                <span className="hidden text-xs font-normal sm:block">Limited-time offer!</span>
                                <span className="text-[10px] font-normal sm:hidden">Limited LTD</span>
                            </span>
                            <div className="absolute top-3.5 left-2 h-6 w-6 animate-ping rounded-full bg-red-500" aria-hidden="true"></div>
                        </Link>
                    </div> }
                </div>
            </div>
        </header>
    );
}
