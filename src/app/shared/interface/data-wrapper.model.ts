export interface DataWrapper<T> {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    data: T;
    etag: string;
}