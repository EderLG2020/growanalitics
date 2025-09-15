import { Modal, Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../store/modalSlice";

export default function EditUsuarioModal() {
  const dispatch = useDispatch();
  const { isOpen, user } = useSelector((state) => state.modal);

  const [form] = Form.useForm();

  const handleSave = (values) => {
    console.log("Guardar cambios:", values);
    dispatch(closeModal());
  };

  return (
    <Modal
      title="Editar usuario"
      open={isOpen}
      onCancel={() => dispatch(closeModal())}
      footer={null}
      afterOpenChange={(open) => open && form.setFieldsValue(user || {})}
    >
      <Form form={form} onFinish={handleSave} layout="vertical">
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
    </Modal>
  );
}
