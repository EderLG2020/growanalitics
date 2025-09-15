import { Table, Input, Button, Space, message } from "antd";
import { EditOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import useUsuarios from "../hook/useUsuarios";
import { openModal } from "../store/modalSlice";
import { useTheme } from "../components/ThemeProvider";
import { themeColors } from "../config/theme";
import { deleteUsuarios } from "../api/users";
import { useState } from "react";

export default function TablaUsuarios() {
  const {
    data,
    pagination,
    loading, 
    searchText,
    setSearchText,
    handleTableChange,
    loadData,
  } = useUsuarios();

  const [loadingDeleteId, setLoadingDeleteId] = useState(null); 
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const colors = isDark ? themeColors.dark : themeColors.light;

const handleEdit = (record) => {
    dispatch(
      openModal({
        title: "Editar usuariod",
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
  

  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    { title: "Usuario", dataIndex: "usuario", sorter: true },
    { title: "Correo", dataIndex: "correo", sorter: true },
    { title: "Nombre completo", dataIndex: "nombre_completo", sorter: true },
    {
      title: "Acciones",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            title="Boton para editar usuario"
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
        allowClear
      />

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={pagination}
        loading={loading} // loading global tabla
        onChange={handleTableChange}
        style={{ background: "transparent" }}
        rowClassName={(_, index) =>
          index % 2 === 0 ? "alt-row" : "normal-row"
        }
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                style={{
                  backgroundColor: colors.table.headerBg,
                  color: colors.table.headerText,
                }}
              />
            ),
          },
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
