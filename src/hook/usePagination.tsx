import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function usePagination<T>(initialState = {}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageNum = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('size') || '10', 10);
    const [pagination, setPagination] = useState({
        pageNum,
        pageSize,
        totalElements: 0,
        ...initialState,
    });

    const onPaginationChange = (pageNum: number, pageSize: number) => {
        setPagination(prev => ({
            ...prev,
            pageNum,
            pageSize,
        }));
        setSearchParams({ page: pageNum.toString(), size: pageSize.toString() });
    };

    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            pageNum,
            pageSize,
        }));
    }, [pageNum, pageSize]);

    return {
        pagination,
        setPagination,
        onPaginationChange,
    };
}
