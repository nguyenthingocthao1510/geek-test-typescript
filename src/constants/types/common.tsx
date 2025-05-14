export type APIResponse<T> = {
    data: T;
    code: number;
    message: string;
};