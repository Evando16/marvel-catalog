export interface DataWrapper<T> {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    data: DataWrapperData<T>;
    etag: string;
}

export interface DataWrapperData<T> {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: T[];
}
