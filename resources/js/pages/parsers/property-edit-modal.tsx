import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PropertyType, SchemaFormType, SchemaItem } from '@/pages/parsers/type';
import { router, useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function PropertyEditModal({
    schema,
    children,
}: {
    schema: SchemaItem;
    children?: (props: { onClick: () => void }) => React.ReactNode;
}) {
    const [open, setOpen] = useState<boolean>(false);

    const { data, setData, put, reset } = useForm<SchemaFormType>({
        parent_id: schema.parent_id,
        name: schema.name,
        type: 'string',
        description: schema.description,
        required: schema.required,
        enum: schema.enum,
    });

    useEffect(() => {
        setData((previousData) => ({
            ...previousData,
            schema_id: schema.id,
            name: schema.name,
            type: schema.type,
            description: schema.description,
            required: schema.required,
            enum: schema.enum,
        }));
    }, [schema, setData]);

    if (!schema) {
        return <></>;
    }

    const updateProperty = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        put(`/schemas/${schema.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload();
                setOpen(false);
                toast.success('Property Updated Successfully');
                reset();
            },
            onError: (error) => {
                toast.success(error.message);
            },
        });
    };

    const addEnumValue = (value: string) => {
        if (!value.trim()) return;

        setData((prev) => {
            const currentEnum = prev.enum || [];
            if (currentEnum.includes(value)) return prev;

            return {
                ...prev,
                enum: [...currentEnum, value],
            };
        });
    };

    const removeEnumValue = (value: string) => {
        setData((prev) => {
            if (!prev.enum) return prev;

            return {
                ...prev,
                enum: prev.enum.filter((v) => v !== value),
            };
        });
    };

    return (
        <>
            {children && children({ onClick: () => setOpen(!open) })}

            <Dialog open={open} onOpenChange={() => setOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Property</DialogTitle>
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
                            <div className="mt-2 flex flex-wrap gap-1">
                                {data.enum?.map((value) => (
                                    <div key={value} className="flex items-center gap-1 rounded bg-blue-50 px-2 py-1 text-xs text-blue-800">
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
                                            },
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
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={updateProperty}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
