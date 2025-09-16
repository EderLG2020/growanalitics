// useUsuarios.js
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

  const [filters, setFilters] = useState({
    id: "",
    usuario: "",
    correo: "",
  });

  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);

  const [sorter, setSorter] = useState({ field: "id", order: "asc" });

  const loadData = async (params = {}) => {
    console.log("[loadData] start", {
      params,
      currentFilters: filters,
      debouncedSearch,
      sorter,
    });
    setLoading(true);
    try {
      const response = await fetchUsuarios({
        page: params.pagination?.current || pagination.current,
        limit: params.pagination?.pageSize || pagination.pageSize,
        sortField: params.sortField || sorter.field,
        sortOrder: params.sortOrder || sorter.order,
        search: params.search ?? debouncedSearch,

        idFilter: filters.id,
        usuarioFilter: filters.usuario,
        correoFilter: filters.correo,
      });

      console.log("[loadData] success", {
        page: response.page,
        total: response.total,
        itemsReturned: Array.isArray(response.data) ? response.data.length : 0,
      });

      setData(response.data);
      setPagination((prev) => ({
        ...prev,
        current: response.page,
        pageSize: params.pagination?.pageSize || prev.pageSize,
        total: response.total,
      }));
    } catch (error) {
      console.error("[loadData] error", error);
    } finally {
      setLoading(false);
      console.log("[loadData] finished loading=false");
    }
  };

  useEffect(() => {
    console.log("[useEffect] triggered (debouncedSearch/filters/sorter) -> calling loadData", {
      debouncedSearch,
      filters,
      sorter,
    });
    loadData({
      pagination,
      sortField: sorter.field,
      sortOrder: sorter.order,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, filters, sorter]); // intentionally depends on filters (same as useTabla2)

  const handleTableChange = (newPagination, _, newSorter) => {
    console.log("[handleTableChange] called", { newPagination, newSorter });
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
    filters,
    setFilters,
    handleTableChange,
    loadData,
  };
}
