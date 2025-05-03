'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JSONPreview } from '@/pages/parsers/json-preview';
import { PropertyAddModal } from '@/pages/parsers/property-add-modal';
import { PropertyItem } from '@/pages/parsers/property-item';
import { SchemaItem } from '@/pages/parsers/type';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export function JsonSchemaEditor({ initialSchema, json }: { initialSchema: SchemaItem; json: Record<string, string | number | null> }) {
    const [schema, setSchema] = useState<SchemaItem>(initialSchema);
    useEffect(() => {
        setSchema(initialSchema); // Update the state whenever the initialSchema prop changes
    }, [initialSchema]);

    const [expandedProps, setExpandedProps] = useState<Record<string, boolean>>({});

    const [currentPropertyState, setCurrentPropertyState] = useState<{
        open: boolean;
        schema: SchemaItem | null;
    }>({
        open: false,
        schema: null,
    });

    const setPropertyDialog = (open: boolean) => {
        setCurrentPropertyState((prevState) => ({
            ...prevState,
            open: open,
        }));
    };

    const toggleExpand = (path: string) => {
        setExpandedProps((prev) => ({
            ...prev,
            [path]: !prev[path],
        }));
    };

    const openAddPropertyDialog = (schema: SchemaItem) => {
        setCurrentPropertyState({
            schema: schema,
            open: true,
        });
    };

    const renderSchemaToJson = (): string => {
        return JSON.stringify(json, null, 2);
    };

    if (!schema) {
        return null;
    }

    return (
        <div className="">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Properties</CardTitle>
                    <div className="flex gap-2">
                        <JSONPreview json={renderSchemaToJson()} />
                        <Button onClick={() => openAddPropertyDialog(schema)}>
                            <Plus className="mr-2 h-4 w-4" /> Add Property
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {Object.values(schema.properties || []).map((property) => (
                            <PropertyItem
                                key={property.id}
                                openAddPropertyDialog={openAddPropertyDialog}
                                expandedProps={expandedProps}
                                toggleExpand={toggleExpand}
                                property={property}
                                path={[property.path]}
                            />
                        ))}
                        {Object.keys(schema.properties || []).length === 0 && (
                            <p className="text-muted-foreground py-4 text-center">No properties defined. Add a property to get started.</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {currentPropertyState.schema && (
                <PropertyAddModal schema={currentPropertyState.schema} open={currentPropertyState.open} onClose={setPropertyDialog} />
            )}
        </div>
    );
}
