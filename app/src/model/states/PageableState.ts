import { PageableState } from '~types/state';
import { PAGE_SIZE_OPTIONS } from '~dictionaries/options';
import { DEFAULT_PAGE_SIZE } from 'antd/lib/table/hooks/usePagination';

export const pageableState: PageableState = {
  totalRecords: 0,
  pageSizeOptions: PAGE_SIZE_OPTIONS,
  serverFilter: {
    pageNum: 0,
    pageSize: DEFAULT_PAGE_SIZE
  }
};
