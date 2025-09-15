import { useState, useEffect } from "react";
import { fetchUsuarios } from "../api/users";
import useDebounce from "./useDebounce";

export default function useUsuarios(initialPageSize = 10) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: initialPageSize,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);
  const [sorter, setSorter] = useState({ field: "id", order: "ascend" });

  const loadData = async (params = {}) => {
    setLoading(true);
    try {
      const response = await fetchUsuarios({
        page: params.pagination?.current || pagination.current,
        limit: params.pagination?.pageSize || pagination.pageSize,
        sortField: params.sortField || sorter.field,
        sortOrder: params.sortOrder || sorter.order,
        search: params.search ?? debouncedSearch,
      });

      setData(response.data);
      setPagination((prev) => ({
        ...prev,
        current: response.page,
        pageSize: params.pagination?.pageSize || prev.pageSize,
        total: response.total,
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData({ pagination: { current: 1, pageSize: pagination.pageSize } });
  }, [debouncedSearch]);

  const handleTableChange = (newPagination, filters, newSorter) => {
    let order = sorter.order;
    let field = sorter.field;

    if (newSorter?.order) {
      if (newSorter.order === "ascend") order = "asc";
      if (newSorter.order === "descend") order = "desc";
      field = newSorter.field;
    }

    setSorter({ field, order });
    setPagination(newPagination);

    loadData({
      pagination: newPagination,
      sortField: field,
      sortOrder: order,
    });
  };

  return {
    data,
    pagination,
    loading,
    searchText,
    setSearchText,
    handleTableChange,
    loadData,
  };
}
