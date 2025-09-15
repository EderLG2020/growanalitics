import { Table, Input, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import useUsuarios from "../hook/useUsuarios";
import EditUsuarioModal from "../components/EditUsuarioModal";

export default function Tabla1() {
  const {
    data,
    pagination,
    loading,
    searchText,
    setSearchText,
    handleTableChange,
  } = useUsuarios();

  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (record) => {
    setEditingUser(record);
    setIsModalOpen(true);
  };

  const handleSave = (values) => {
    setIsModalOpen(false);
    setEditingUser(null);
    // Podrías recargar los datos del backend aquí si es necesario
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

      <EditUsuarioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={editingUser}
        onSave={handleSave}
      />
    </div>
  );
}
