import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Code } from 'lucide-react';

export function JSONPreview({ json }: { json: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <Code className="h-4 w-4" />
                    Json Preview
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] sm:max-w-6xl w-full overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Candidate's Json Schema</DialogTitle>
                    <DialogDescription>
                        The response will be in this json schema format.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="mt-2 overflow-x-auto rounded-md bg-gray-100 p-4 text-xs dark:bg-gray-800">
                        <pre className="whitespace-pre-wrap">{json}</pre>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
