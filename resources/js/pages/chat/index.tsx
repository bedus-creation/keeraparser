import { Playground } from '@/components/playground';
import AppLayout from '@/layouts/app-layout';
import { Chat as ChatType, ParserList } from '@/pages/chat/types';
import { Head } from '@inertiajs/react';

export default function Chat({ parsers, chat }: { chat?: ChatType, parsers: ParserList[] }) {
    return (
        <AppLayout>
            <Head title="Keera document Parser" />

            <main className="container mx-auto px-4 py-6 md:px-6">
                <div className="flex flex-col gap-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Resume Parser Playground</h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Upload a resume, parse it, and customize the JSON structure to fit your needs
                        </p>
                    </div>
                    <Playground parsers={parsers} chat={chat}/>
                </div>
            </main>
        </AppLayout>
    );
}
