export type TPaginationResponse<T> = {
    content: T[];
    pageNum: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
};

export type TPagination = {
    pageNum: number;
    pageSize: number;
};
