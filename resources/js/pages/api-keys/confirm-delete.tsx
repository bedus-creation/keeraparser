import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

export function ConfirmDelete({ id, setDeleteId }: { id: string | null; setDeleteId: React.Dispatch<React.SetStateAction<string | null>> }) {
    if (!id) {
        return '';
    }

    const handleDelete = () => {
        router.delete(route('tokens.delete', id), {
            onSuccess: () => {
                router.reload({
                    only: ['apiKeys'],
                });
                setDeleteId(null);
                toast.success('Success!', {
                    description: 'The API key has been permanently deleted.',
                });
            },
        });
    };

    return (
        <Dialog open={!!id} onOpenChange={()=>setDeleteId(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <p>This action cannot be undone. This will permanently delete the API key.</p>
                <DialogFooter>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setDeleteId(null);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
