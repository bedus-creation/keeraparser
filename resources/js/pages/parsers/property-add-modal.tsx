import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PropertyType } from '@/pages/parsers/type';
import { InertiaFormProps, router, useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function PropertyAddModal({ open, schema_id, onClose }: { open: boolean; schema_id: number; onClose: (open: boolean) => void }) {
    const [isArrayItemProperty, setIsArrayItemProperty] = useState(false);
    const currentPath = '';

    const {
        data,
        setData,
        post,
        processing,
        errors
    }: InertiaFormProps<{
        schema_id: number;
        name: string;
        type: string;
        description: string;
        required: boolean;
        items?: {
            type: PropertyType;
        }
        enum?: string[];
    }> = useForm({
        schema_id: schema_id,
        name: '',
        type: 'string',
        description: '',
        required: false,
        items: null,
        enum: null
    });

    useEffect(() => {
        setData((previousData) => ({
            ...previousData,
            schema_id
        }));
    }, [schema_id, setData]);

    const addProperty = (event) => {
        event.preventDefault();

        post('/schemas', {
            onSuccess: () => {
                router.reload();

                onClose(false);
            }
        });
    };

    const addEnumValue = (value: string) => {
        if (!value.trim()) return;

        setData((prev) => {
            const currentEnum = prev.enum || [];
            if (currentEnum.includes(value)) return prev;

            return {
                ...prev,
                enum: [...currentEnum, value]
            };
        });
    };

    const removeEnumValue = (value: string) => {
        setData((prev) => {
            if (!prev.enum) return prev;

            return {
                ...prev,
                enum: prev.enum.filter((v) => v !== value)
            };
        });
    };

    if (!open) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isArrayItemProperty ? 'Add Property to Array Item' : 'Add New Property'}</DialogTitle>
                    <DialogDescription>
                        {isArrayItemProperty
                            ? `Adding property to items in ${currentPath.join('.')}`
                            : currentPath.length > 0
                                ? `Adding property to ${currentPath.join('.')}`
                                : 'Adding property to root object'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Property Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            placeholder="e.g. firstName"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="type">Type</Label>
                        <Select value={data.type} onValueChange={(value) => setData({ ...data, type: value as PropertyType })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="string">String</SelectItem>
                                <SelectItem value="number">Number</SelectItem>
                                <SelectItem value="integer">Integer</SelectItem>
                                <SelectItem value="boolean">Boolean</SelectItem>
                                <SelectItem value="enum">Enum</SelectItem>
                                <SelectItem value="object">Object</SelectItem>
                                <SelectItem value="array">Array</SelectItem>
                                <SelectItem value="null">Null</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {data.type === 'enum' && (
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add enum value"
                                    id="enumValue"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const input = e.currentTarget;
                                            addEnumValue(input.value);
                                            input.value = '';
                                        }
                                    }}
                                />
                                <Button
                                    type="button"
                                    onClick={() => {
                                        const input = document.getElementById('enumValue') as HTMLInputElement;
                                        addEnumValue(input.value);
                                        input.value = '';
                                    }}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>
                    )}

                    {data.type === 'enum' && data.enum?.length && data.enum?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {data.enum?.map((value) => (
                                <div
                                    key={value}
                                    className="flex items-center gap-1 bg-blue-50 text-blue-800 px-2 py-1 rounded text-xs">
                                    {value}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-4 w-4 p-0"
                                        onClick={() => removeEnumValue(value)}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description || ''}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            placeholder="Describe this property"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="required"
                            checked={data.required}
                            onCheckedChange={(checked) => setData({ ...data, required: checked === true })}
                        />
                        <Label htmlFor="required">Required</Label>
                    </div>

                    {data.type === 'array' && (
                        <div className="grid gap-2">
                            <Label>Array Items Type</Label>
                            <Select
                                value={data.items?.type || 'string'}
                                onValueChange={(value) =>
                                    setData({
                                        ...data,
                                        items: {
                                            ...data.items,
                                            type: value,
                                        }
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="string">String</SelectItem>
                                    <SelectItem value="number">Number</SelectItem>
                                    <SelectItem value="integer">Integer</SelectItem>
                                    <SelectItem value="boolean">Boolean</SelectItem>
                                    <SelectItem value="object">Object</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onClose(false)}>
                        Cancel
                    </Button>
                    <Button onClick={addProperty}>Add Property</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
