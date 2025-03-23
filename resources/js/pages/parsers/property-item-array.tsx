import { Button } from '@/components/ui/button';
import { SchemaProperty } from '@/pages/parsers/type';
import { Trash2 } from 'lucide-react';

export function PropertyItemArray({ property }: { property: SchemaProperty }) {
    return (
        <div className="mb-2 rounded-md border p-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="font-medium">{property.name}</span>
                    <span className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs">{property.type}</span>
                    {property.description && <p className="text-muted-foreground text-xs">{property.description}</p>}
                    {property.required && <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-800">required</span>}
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeArrayItemProperty(arrayPath, property.name)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
            </div>
        </div>
    );
}
