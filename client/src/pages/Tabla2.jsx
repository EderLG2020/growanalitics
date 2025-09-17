import { useState } from "react";
import { Table, Input, Space, Form, Popconfirm, message,Select } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import useTabla2 from "../hook/useTabla2";
import { deleteUsuarios, editUsuarios } from "../api/users";

export default function Tabla2() {
  const {
    data,
    pagination,
    loading,
    filters,
    setFilters,
    handleTableChange,
    loadData,
  } = useTabla2(10);

  const [form] = Form.useForm();
  const [editingRow, setEditingRow] = useState(null);

  const isEditing = (record) => record.id === editingRow;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingRow(record.id);
  };

  const cancel = () => {
    setEditingRow(null);
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      await editUsuarios(id, row); // API
      message.success("Usuario actualizado correctamente");
      setEditingRow(null);
      loadData(); // refrescar
    } catch (err) {
      console.error("Error actualizando", err);
      message.error("No se pudo actualizar el usuario");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUsuarios(id);
      message.success("Usuario eliminado correctamente");
      loadData(); 
    } catch (err) {
      console.error("Error eliminando", err);
      message.error("No se pudo eliminar el usuario");
    }
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
          onPressEnter={close}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
      </div>
    ),
    filterIcon: (
      <SearchOutlined
        style={{ color: filters[dataIndex] ? "#1677ff" : undefined }}
      />
    ),
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
      render: (_, record) =>
        isEditing(record) ? (
          <Form.Item name="id">{record.id}</Form.Item>
        ) : (
          record.id
        ),
    },
    {
      title: "Usuario",
      dataIndex: "usuario",
      sorter: true,
      ...getColumnSearchProps("usuario", "Buscar usuario"),
      render: (_, record) =>
        isEditing(record) ? (
          <Form.Item
      name="usuario"
      style={{ margin: 0 }}
      rules={[{ required: true, message: "El usuario es obligatorio" }]}
    >
      <Input
        bordered={false}           
        style={{
          width: "100%",
          padding: 0,            
          height: "100%",        
          boxShadow: "none",       
        }}
      />
    </Form.Item>
        ) : (
          record.usuario
        ),
    },
    {
      title: "Tipo de Usuario",
      dataIndex: "tipo_usuario",
      sorter: true,
      ...getColumnSearchProps("tipo_usuario", "Buscar tipo"),
      render: (_, record) =>
        isEditing(record) ? (
          <Form.Item
            name="tipo_usuario"
            style={{ margin: 0 }}
            rules={[{ required: true, message: "Tipo requerido" }]}
          >
            <Select
              style={{ width: "100%" }}
              options={[
                { value: "admin", label: "Admin" },
                { value: "editor", label: "Editor" },
                { value: "viewer", label: "Viewer" },
              ]}
            />
          </Form.Item>
        ) : (
          record.tipo_usuario
        ),
    },
    
    {
      title: "Acciones",
      dataIndex: "acciones",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <SaveOutlined
              style={{ color: "green", cursor: "pointer" }}
              onClick={() => save(record.id)}
            />
            <CloseOutlined
              style={{ color: "gray", cursor: "pointer" }}
              onClick={cancel}
            />
          </Space>
        ) : (
          <Space>
            <EditOutlined
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => edit(record)}
            />
            <Popconfirm
              title="¿Eliminar usuario?"
              onConfirm={() => handleDelete(record.id)}
            >
              <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Form form={form} component={false}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: "max-content" }}
      />
    </Form>
  );
}
