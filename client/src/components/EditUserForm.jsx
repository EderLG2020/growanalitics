import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { closeModal } from "../store/modalSlice";

export default function EditUserForm({ user }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSave = (values) => {
    console.log("Guardar cambios:", values);
    dispatch(closeModal());
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
      <Button type="primary" htmlType="submit" block>
        Guardar
      </Button>
    </Form>
  );
}
