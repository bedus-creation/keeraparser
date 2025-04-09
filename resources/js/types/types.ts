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
    prev_page_url: string;
    next_page_url: string;
    current_page: number;
    total: number;
    per_page: number;
}

export type Params = Record<string, never>
