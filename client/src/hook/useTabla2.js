import { useState, useEffect } from "react";
import { fetchUsuarios } from "../api/users";
import useDebounce from "./useDebounce";

export default function useTabla2(initialPageSize = 10) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: initialPageSize,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  // filtros de búsqueda
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);

  const [filters, setFilters] = useState({
    usuario: "",
    tipo_usuario: "",
  });

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
        usuario: params.usuario ?? filters.usuario,
        tipo_usuario: params.tipo_usuario ?? filters.tipo_usuario,
        view: "roles",
      });

      setData(response.data);
      setPagination((prev) => ({
        ...prev,
        current: (response.page ?? 1),   // 👈 si API ya es base 1, lo dejas así
        pageSize: params.pagination?.pageSize || prev.pageSize,
        total: response.total,
      }));
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData({
      pagination,
      sortField: sorter.field,
      sortOrder: sorter.order,
      usuario: filters.usuario,
      tipo_usuario: filters.tipo_usuario,
    });
  }, [debouncedSearch, filters, sorter]);
  

  const handleTableChange = (newPagination, _filters, newSorter) => {
    let order = newSorter?.order || sorter.order;
    let field = newSorter?.field || sorter.field;
  
    setSorter({ field, order });
    setPagination(newPagination);
  
    loadData({
      pagination: newPagination,
      sortField: field,
      sortOrder: order,
      usuario: filters.usuario,
      tipo_usuario: filters.tipo_usuario,
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
