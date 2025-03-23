import { Button } from '@/components/ui/button';
import { PropertyItemArray } from '@/pages/parsers/property-item-array';
import { SchemaProperty } from '@/pages/parsers/type';
import { router } from '@inertiajs/react';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';

export function PropertyItem({
    openAddPropertyDialog,
    expandedProps,
    toggleExpand,
    property,
}: {
    openAddPropertyDialog: any;
    expandedProps: any;
    toggleExpand: (path: string) => void;
    property: SchemaProperty;
}) {
    const fullPath = [...path, property.name].join('.');
    const isExpanded = expandedProps[fullPath] || false;
    const hasChildren =
        (property.type === 'object' && property.properties && Object.keys(property.properties).length > 0) ||
        (property.type === 'array' && property.items);

    const removeProperty = () => {
        router.delete(`/schemas/${property.id}`, {});
    };

    return (
        <div key={fullPath} className="mb-2 rounded-md border">
            <div
                className="hover:bg-muted/50 flex cursor-pointer items-center justify-between p-3"
                onClick={() => hasChildren && toggleExpand(fullPath)}
            >
                <div className="flex items-center gap-2">
                    {hasChildren && (
                        <button className="text-muted-foreground">
                            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>
                    )}
                    <span className="font-medium">{property.name}</span>
                    <span className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs">{property.type}</span>
                    {property.description && <p className="text-muted-foreground text-xs">{property.description}</p>}
                    {property.required && <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-800">required</span>}
                </div>
                <div className="flex items-center gap-2">
                    {property.type === 'object' && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                openAddPropertyDialog(property.id);
                            }}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeProperty([...path, property.name]);
                        }}
                    >
                        <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                </div>
            </div>

            {isExpanded && (
                <div className="border-t p-3 pt-0">
                    {property.type === 'object' && property.properties && (
                        <div className="mt-2 pl-4">
                            {Object.values(property.properties).map((prop) => (
                                <PropertyItem
                                    openAddPropertyDialog={openAddPropertyDialog}
                                    expandedProps={expandedProps}
                                    toggleExpand={toggleExpand}
                                    property={prop}
                                    path={[]}
                                />
                            ))}
                            {Object.keys(property.properties).length === 0 && <p className="text-muted-foreground text-sm italic">No properties</p>}
                        </div>
                    )}

                    {property.type === 'array' && property.items && (
                        <div className="mt-2 pl-4">
                            <div className="rounded-md border p-2">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs">{property.items.type}</span>
                                    {property.items.description && <p className="text-muted-foreground text-xs">{property.items.description}</p>}
                                    {property.items.type === 'object' && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openAddPropertyDialog(property.id);
                                            }}
                                        >
                                            <Plus className="h-4 w-4" /> Add Property
                                        </Button>
                                    )}
                                </div>

                                {property.items.type === 'object' && property.items.properties && (
                                    <div>
                                        {Object.keys(property.items.properties).length > 0 ? (
                                            <div className="pl-2">
                                                {Object.values(property.items.properties).map((itemProp) => (
                                                    <PropertyItemArray key={itemProp.id} property={itemProp} />
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground text-sm italic">No properties defined for array items</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
