import { Modal, Form, Input, Button } from "antd";

export default function EditUsuarioModal({ isOpen, onClose, user, onSave }) {
  return (
    <Modal
      title="Editar usuario"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form initialValues={user} onFinish={onSave} layout="vertical">
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
