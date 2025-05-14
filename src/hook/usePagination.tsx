import { useState } from 'react';

export default function usePagination<T>(initialState = {}) {
    const [pagination, setPagination] = useState({
        pageNum: 1,
        pageSize: 10,
        totalElements: 0,
        ...initialState,
    });

    const onPaginationChange = (pageNum: number, pageSize: number) => {
        setPagination(prev => ({
            ...prev,
            pageNum,
            pageSize,
        }));
    };

    return {
        pagination,
        setPagination,
        onPaginationChange,
    };
}
