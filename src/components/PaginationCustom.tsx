import React, { useState } from 'react';
import { Pagination, PaginationProps } from 'antd';

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
  showQuickJumper?:
  | boolean
  | {
    goButton?: React.ReactNode;
  };
  showTotal?: (total?: any, range?: any) => void;
};

const PaginationCustom: React.FC<Props & PaginationProps> = ({
  page,
  pageSize,
  total,
  onPageChange,
  showQuickJumper,
  showTotal,
  ...rest
}) => {
  return (
    <div
      onKeyDown={e => {
        if (e.key === 'Enter') {
          e.stopPropagation();
        }
      }}
    >
      <Pagination
        responsive={true}
        showQuickJumper={showQuickJumper}
        showTotal={showTotal}
        {...rest}
        defaultCurrent={0}
        align='center'
        current={page + 1}
        pageSize={pageSize}
        total={total}
        showSizeChanger
        onShowSizeChange={onPageChange}
        defaultPageSize={pageSize}
        onChange={(page, pageSize) => {
          onPageChange(page - 1, pageSize);
        }}
        pageSizeOptions={['10', '20', '50', '100']}
        locale={{
          jump_to: 'To',
          jump_to_confirm: 'Confirm',
          items_per_page: 'items per page',
          next_3: '3 next pages',
          next_5: '5 next pages',
          next_page: 'Next page',
          page: '',
          prev_3: '3 previous pages',
          prev_5: '5 previous pages',
          prev_page: 'Previous pages',
        }}
      />
    </div>
  );
};

export default PaginationCustom;
