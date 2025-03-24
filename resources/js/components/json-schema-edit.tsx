'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { PropertyAddModal } from '@/pages/parsers/property-add-modal';
import { PropertyItem } from '@/pages/parsers/property-item';
import { JsonSchema, SchemaProperty } from '@/pages/parsers/type';
import { Plus, Save } from 'lucide-react';
import { useEffect, useState } from 'react';

export function JsonSchemaEditor({ initialSchema }: { initialSchema: JsonSchema }) {
    const [schema, setSchema] = useState<JsonSchema>(initialSchema);
    useEffect(() => {
        setSchema(initialSchema); // Update the state whenever the initialSchema prop changes
    }, [initialSchema]);

    const [expandedProps, setExpandedProps] = useState<Record<string, boolean>>({});

    const [currentPropertyState, setCurrentPropertyState] = useState<Record<string, any>>({
        open: false,
        schema_id: '',
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

    const openAddPropertyDialog = (schema_id: number) => {
        setCurrentPropertyState({
            schema_id: schema_id,
            open: true,
        });
    };

    const renderSchemaToJson = (): string => {
        const result: any = {
            title: schema.title,
            description: schema.description,
            type: 'object',
            properties: {},
            required: schema.required,
        };

        // Convert our internal schema format to standard JSON Schema
        Object.entries(schema.properties).forEach(([key, prop]) => {
            result.properties[key] = convertPropertyToJsonSchema(prop);
        });

        return JSON.stringify(result, null, 2);
    };

    const convertPropertyToJsonSchema = (prop: SchemaProperty): any => {
        const result: any= {
            type: prop.type,
        };

        if (prop.description) {
            result.description = prop.description;
        }

        if (prop.default !== undefined) {
            result.default = prop.default;
        }

        if (prop.type === 'object' && prop.properties) {
            result.properties = {};
            const required: string[] = [];

            Object.entries(prop.properties).forEach(([key, nestedProp]) => {
                result.properties[key] = convertPropertyToJsonSchema(nestedProp);
                if (nestedProp.required) {
                    required.push(key);
                }
            });

            if (required.length > 0) {
                result.required = required;
            }
        }

        if (prop.type === 'array' && prop.items) {
            // If array items are objects with properties, handle them specially
            if (prop.items.type === 'object' && prop.items.properties) {
                result.items = {
                    type: 'object',
                    properties: {},
                };

                const required: string[] = [];

                Object.entries(prop.items.properties).forEach(([key, nestedProp]) => {
                    result.items.properties[key] = convertPropertyToJsonSchema(nestedProp);
                    if (nestedProp.required) {
                        required.push(key);
                    }
                });

                if (required.length > 0) {
                    result.items.required = required;
                }
            } else {
                // Simple array items
                result.items = convertPropertyToJsonSchema(prop.items);
            }
        }

        return result;
    };

    if (!schema) {
        return null;
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Schema Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" value={schema.title} onChange={(e) => setSchema({ ...schema, title: e.target.value })} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={schema.description}
                                onChange={(e) => setSchema({ ...schema, description: e.target.value })}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="visual">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="visual">Visual Editor</TabsTrigger>
                    <TabsTrigger value="json">JSON</TabsTrigger>
                </TabsList>
                <TabsContent value="visual" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Properties</CardTitle>
                            <Button onClick={() => openAddPropertyDialog(schema.id)}>
                                <Plus className="mr-2 h-4 w-4" /> Add Property
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {Object.values(schema.properties).map((property) => (
                                    <PropertyItem
                                        key={property.id}
                                        openAddPropertyDialog={openAddPropertyDialog}
                                        expandedProps={expandedProps}
                                        toggleExpand={toggleExpand}
                                        property={property}
                                        path={[]}
                                    />
                                ))}
                                {Object.keys(schema.properties).length === 0 && (
                                    <p className="text-muted-foreground py-4 text-center">No properties defined. Add a property to get started.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="json">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>JSON Schema</CardTitle>
                            <Button variant="outline">
                                <Save className="mr-2 h-4 w-4" /> Download
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <pre className="bg-muted max-h-[500px] overflow-auto rounded-md p-4">
                                <code>{renderSchemaToJson()}</code>
                            </pre>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <PropertyAddModal open={currentPropertyState.open} schema_id={currentPropertyState.schema_id} onClose={setPropertyDialog} />
        </div>
    );
}
