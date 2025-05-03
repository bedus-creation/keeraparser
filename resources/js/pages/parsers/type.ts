import { Pagination } from '@/types';

export interface Parser {
    id: number;
    name: string;
    user_id: number;
    type: string;
    system_prompt: string;
}

export interface SchemaItem {
    id: number;
    parent_id?: number | null;
    path: string;
    name: string;
    description?: string;
    type?: PropertyType | string;
    enum?: string[] | null;
    required?: boolean;
    properties?: Record<string, SchemaItem>;
    items?: SchemaItem;
}

export type SchemaFormType = Omit<SchemaItem, 'id' | 'path' | 'properties' | 'items'> & {
    items?: {
        type?: PropertyType | string;
    } | null;
};

export type PropertyType = 'string' | 'number' | 'boolean' | 'enum' | 'object' | 'array' | 'null' | 'integer';

export type ParserPaginate = { data: Parser[]; pagination: Pagination };
