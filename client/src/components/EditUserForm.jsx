import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { closeModal } from "../store/modalSlice";
import { useState, useEffect } from "react";
import { editUsuarios } from "../api/users";

export default function EditUserForm({ user, onSuccess }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const handleSave = async (values) => {
    try {
      setSaving(true);
      await editUsuarios(user.id, values);
      message.success("Usuario actualizado correctamente");

      if (onSuccess) onSuccess();
      dispatch(closeModal());
    } catch (err) {
      console.error(err);
      message.error("Error al actualizar el usuario");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={user}
      onFinish={handleSave}
    >
      <Form.Item name="usuario" label="Usuario">
        <Input />
      </Form.Item>
      <Form.Item name="correo" label="Correo">
        <Input />
      </Form.Item>
      <Form.Item name="nombre_completo" label="Nombre completo">
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit" block loading={saving}>
        {saving ? "Guardando..." : "Guardar"}
      </Button>
    </Form>
  );
}
