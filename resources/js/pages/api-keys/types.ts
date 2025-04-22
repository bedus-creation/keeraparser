export interface ApiKey {
    id: string;
    name: string;
    token: string;
    created_at: string;
    last_used_at: string | null;
    expires_at: string | null;
}
