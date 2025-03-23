export interface Parser {
    id: number;
    name: string;
    user_id: number;
}

export interface SchemaProperty {
    id: number;
    name: string;
    type: PropertyType;
    description?: string;
    required: boolean;
    default?: any;
    properties?: Record<string, SchemaProperty>;
    items?: SchemaProperty;
}

export type PropertyType = 'string' | 'number' | 'boolean' | 'enum' | 'object' | 'array' | 'null' | 'integer';

export interface JsonSchema {
    id: number;
    title: string;
    description: string;
    type: 'object';
    properties: Record<string, SchemaProperty>;
    required: string[];
    enum: string[];
}
