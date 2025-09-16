// TablaUsuarios.jsx
import { useState } from "react";
import { Table, Input, Button, Space, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import useUsuarios from "../hook/useUsuarios";
import { openModal } from "../store/modalSlice";
import { useTheme } from "../components/ThemeProvider";
import { themeColors } from "../config/theme";
import { deleteUsuarios } from "../api/users";

export default function TablaUsuarios() {
  const {
    data,
    pagination,
    loading,
    searchText,
    setSearchText,
    filters,
    setFilters,
    handleTableChange,
    loadData,
  } = useUsuarios();

  const [loadingDeleteId, setLoadingDeleteId] = useState(null);
  const dispatch = useDispatch();
  const { isDark } = useTheme();

  const colors = isDark ? themeColors.dark : themeColors.light;

  const [openDropdown, setOpenDropdown] = useState(null);
  const handleEdit = (record) => {
    dispatch(
      openModal({
        title: "Editar usuario",
        type: "editUser",
        props: {
          user: record,
          onSuccess: loadData,
        },
        width: 500,
        footer: null,
      })
    );
  };

  const handleDelete = (record) => {
    dispatch(
      openModal({
        title: "Confirmar eliminación",
        type: "confirmDeleteUser",
        props: {
          user: record,
          onConfirm: async () => {
            try {
              setLoadingDeleteId(record.id);
              await deleteUsuarios(record.id);
              message.success("Usuario eliminado");
              loadData();
            } catch (err) {
              message.error("Error al eliminar usuario");
            } finally {
              setLoadingDeleteId(null);
            }
          },
        },
        width: 400,
        footer: null,
      })
    );
  };

  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({ close }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={placeholder}
          value={filters[dataIndex]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              [dataIndex]: e.target.value,
            }))
          }
          onPressEnter={() => {
            close();
            setOpenDropdown(null);
          }}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
      </div>
    ),
    filterIcon: (
      <SearchOutlined
        style={{ color: filters[dataIndex] ? "#1677ff" : undefined }}
      />
    ),
    filterDropdownOpen: openDropdown === dataIndex,
    onFilterDropdownOpenChange: (open) => {
      console.log(`Dropdown ${dataIndex}:`, open);
      setOpenDropdown(open ? dataIndex : null);
    },
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
      ...getColumnSearchProps("id", "Buscar ID"),
    },
    {
      title: "Usuario",
      dataIndex: "usuario",
      sorter: true,
      ...getColumnSearchProps("usuario", "Buscar usuario"),
    },
    {
      title: "Correo",
      dataIndex: "correo",
      sorter: true,
      ...getColumnSearchProps("correo", "Buscar correo"),
    },
    {
      title: "Nombre completo",
      dataIndex: "nombre_completo",
      sorter: true,
    },
    {
      title: "Acciones",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            title="Editar usuario"
            onClick={() => handleEdit(record)}
          />
          <Button
            danger
            icon={
              loadingDeleteId === record.id ? (
                <LoadingOutlined spin />
              ) : (
                <DeleteOutlined />
              )
            }
            title="Eliminar usuario"
            loading={loadingDeleteId === record.id}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Input.Search
        placeholder="Buscar por nombre completo"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        style={{ background: "transparent" }}
        rowClassName={(_, index) =>
          index % 2 === 0 ? "alt-row" : "normal-row"
        }
        components={{
          
          body: {
            cell: (props) => (
              <td
                {...props}
                style={{
                  ...props.style,
                  backgroundColor: "transparent",
                  color: colors.text,
                }}
              />
            ),
          },
        }}
      />
    </div>
  );
}
