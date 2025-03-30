export interface BaseFile extends File{
    path: string;
}

export interface Auth {
    user: {
        id: number;
        email: string;
    };
}

export interface Pagination {
    page: number;
}

export type Params = Record<string, never>
