import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { ConfirmDelete } from '@/pages/api-keys/confirm-delete';
import { Empty } from '@/pages/api-keys/empty';
import { ApiKey } from '@/pages/api-keys/types';
import type { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import axios from 'axios';
import { Copy, MoreHorizontal, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'API Keys',
        href: '/api-keys',
    },
];

export default function ApiKeys({ apiKeys }: { apiKeys: ApiKey[] }) {
    const { data, setData, reset } = useForm({
        name: '',
    });

    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [newGeneratedKey, setNewGeneratedKey] = useState('');

    const handleCreateKey = () => {
        axios
            .post(route('tokens.create'), data, {
                withCredentials: true,
            })
            .then((response) => response.data)
            .then((response) => {
                setNewGeneratedKey(response.token);
                reset();
                toast.success('Success', {
                    description: 'A new key has been created.',
                });
                router.reload({
                    only: ['apiKeys'],
                });

                setShowCreateDialog(false);
                setShowNewKeyDialog(true);
            });
    };

    const handleCopyKey = () => {
        navigator.clipboard.writeText(newGeneratedKey);
        toast.success('Success!', {
            description: 'The API key has been copied to your clipboard.',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="API Keys | Keera document Parser" />
            <ConfirmDelete id={deleteId} setDeleteId={setDeleteId} />

            <main className="container mx-auto px-4 py-6 md:px-6">
                <div className="container mx-auto py-10">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">API Keys</h1>
                            <p className="text-muted-foreground">View usage per API key on the Usage page.</p>
                        </div>
                        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                            <DialogTrigger asChild>
                                <Button className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Create API Key
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create new API key</DialogTitle>
                                    <DialogDescription>API keys allow applications to authenticate with our service.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Example: Development"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleCreateKey} disabled={!data.name}>
                                        Create API Key
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Your new API key</DialogTitle>
                                    <DialogDescription>Please copy your API key now. You won't be able to see it again.</DialogDescription>
                                </DialogHeader>
                                <div className="bg-muted overflow-x-auto rounded-md p-3 font-mono text-sm">{newGeneratedKey}</div>
                                <DialogFooter>
                                    <Button onClick={handleCopyKey} className="gap-2">
                                        <Copy className="h-4 w-4" />
                                        Copy
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {apiKeys.length > 0 ? (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Secret Key</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead>Last used</TableHead>
                                        <TableHead>Expires At</TableHead>
                                        <TableHead className="w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {apiKeys.map((key) => (
                                        <TableRow key={key.id}>
                                            <TableCell className="font-medium">{key.name}</TableCell>
                                            <TableCell className="font-mono">{key.token}</TableCell>
                                            <TableCell>{key.created_at}</TableCell>
                                            <TableCell>{key.last_used_at || 'Never'}</TableCell>
                                            <TableCell>{key.expires_at || 'Never'}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Open menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            className="text-destructive focus:text-destructive"
                                                            onClick={() => setDeleteId(key.id)}
                                                        >
                                                            <Trash className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <Empty onCreateKey={() => setShowCreateDialog(true)} />
                    )}
                </div>
            </main>
        </AppLayout>
    );
}
