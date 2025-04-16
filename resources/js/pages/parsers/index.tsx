import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { ParserPaginate } from '@/pages/parsers/type';
import { Auth, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import debounce from 'debounce';
import { Edit, GitFork, Search } from 'lucide-react';
import { useEffect, useMemo } from 'react';

export default function Parsers({ params, parsers, auth }: { params: { search: string }; parsers: ParserPaginate; auth: Auth }) {
    const { data, setData, get } = useForm<{
        filter: {
            q: string;
        };
    }>({
        filter: {
            q: '',
        },
    });

    const setFilter = (key: string, value: any) => {
        setData({ filter: { q: value } });
    };

    useEffect(() => {
        setData((currentData) => ({
            ...currentData,
            ...params,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const search = useMemo(
        () =>
            debounce(() => {
                get('/parsers', {
                    preserveState: true,
                });
            }, 300),
        [get],
    );

    useEffect(() => {
        search();
    }, [data.filter, search]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Parsers',
            href: '/parsers',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Keera document Parser" />
            <main className="container mx-auto px-4 py-6 md:px-6">
                <div className="mb-8 flex flex-col gap-4 md:flex-row">
                    <div className="relative flex-1">
                        <Input
                            value={data.filter.q || ''}
                            onChange={(e) => setFilter('q', e.target.value)}
                            placeholder="Search prompts..."
                            className="px-3"
                        />
                    </div>
                    <Button onClick={() => search()}>
                        <Search className="text-muted-foreground h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {parsers.data.map((prompt) => (
                        <Card key={prompt.id} className="h-full transition-shadow hover:shadow-md">
                            <CardHeader>
                                <CardTitle className="line-clamp-2">{prompt.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground line-clamp-3">{prompt.system_prompt}</p>
                            </CardContent>
                            <CardFooter>
                                <div className="mb-2 flex w-full flex-wrap gap-2">
                                    <Badge className="w-fit">{prompt.type}</Badge>
                                    {/*{prompt.tags.map((tag) => (*/}
                                    {/*    <Badge key={tag} variant="outline" className="text-xs">*/}
                                    {/*        {tag}*/}
                                    {/*    </Badge>*/}
                                    {/*))}*/}
                                </div>
                                <div className="mt-2 flex w-full justify-end gap-1">
                                    {prompt.user_id === auth.user.id && (
                                        <Link
                                            as="button"
                                            className="hover:bg-accent hover:text-accent-foreground h-8 px-2"
                                            href={`/parsers/${prompt.id}/edit`}
                                        >
                                            <Edit className="h-3.5 w-3.5" />
                                        </Link>
                                    )}
                                    <Link
                                        as="button"
                                        className="hover:bg-accent hover:text-accent-foreground h-8 px-2"
                                        href={`/parsers/${prompt.id}/forks`}
                                    >
                                        <GitFork className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </AppLayout>
    );
}
