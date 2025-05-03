import { Card } from '@/components/ui/card';

interface ResultsViewerProps {
    results: Record<string, string | number | boolean | null>;
}

export function ResultsViewer({ results }: ResultsViewerProps) {
    return (
        <div className="space-y-4">
            <Card className="p-6">
                <pre className="max-h-[500px] overflow-auto rounded-md bg-gray-100 p-4 text-sm dark:bg-gray-800">
                    {JSON.stringify(results, null, 2)}
                </pre>
            </Card>
        </div>
    );
}
