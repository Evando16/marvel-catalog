export interface ComicRequest {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Comic[];
}

export interface Comic {
    id: number;
    title: string;
}