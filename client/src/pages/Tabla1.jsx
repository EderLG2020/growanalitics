import { Table, Input, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import useUsuarios from "../hook/useUsuarios";
import { openModal } from "../store/modalSlice";

export default function TablaUsuarios() {
  const {
    data,
    pagination,
    loading,
    searchText,
    setSearchText,
    handleTableChange,
  } = useUsuarios();

  const dispatch = useDispatch();

  const handleEdit = (record) => {
    dispatch(
      openModal({
        title: "Editar usuario",
        type: "editUser",
        props: { user: record },
        width: 500,
        footer: null,
      })
    );
  };

  const handleDelete = (id) => {
    console.log("Eliminar usuario", id);
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
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
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
        loading={loading}
        onChange={handleTableChange}
        
      />
    </div>
  );
}
