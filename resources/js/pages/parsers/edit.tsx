import InputError from '@/components/input-error';
import { JsonSchemaEditor } from '@/components/json-schema-edit';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Parser, SchemaItem } from '@/pages/parsers/type';
import type { BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
export default function ParserEdit({ parser, schema, json }: { schema: SchemaItem; parser: Parser; json: Record<string, string | number | null> }) {
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

    const { data, setData, put, recentlySuccessful } = useForm<{
        name: string;
        system_prompt: string;
    }>({
        name: parser.name,
        system_prompt: parser.system_prompt,
    });

    const submit: FormEventHandler =(e ) => {
        e.preventDefault()
        put(`/parsers/${parser.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Parser has been updated successfully.');
            }
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Keera document Parser Edit" />

            <main className="container mx-auto grid gap-y-6 px-4 py-6 md:px-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Parser</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>

                                <Input
                                    id="name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    placeholder="Name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />

                                <InputError />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="system_prompt">
                                    System Prompt
                                </Label>

                                <Textarea
                                    id="system_prompt"
                                    className="mt-1 block w-full"
                                    placeholder="System Prompt"
                                    value={data.system_prompt}
                                    onChange={(e) => setData('system_prompt', e.target.value)}
                                />

                                <InputError />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit">Save Parser</Button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">Saved</p>
                                </Transition>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <JsonSchemaEditor key={schema.id} initialSchema={schema} json={json} />
            </main>
        </AppLayout>
    );
}
