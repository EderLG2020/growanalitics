import { Button, Space, Typography } from "antd";
import { useDispatch } from "react-redux";
import { closeModal } from "../store/modalSlice";
import { useState } from "react";

const { Text } = Typography;

export default function ConfirmDeleteUser({ user, onConfirm }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await onConfirm(); // viene de TablaUsuarios
      dispatch(closeModal());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "16px" }}>
      <Text strong>
        ¿Estás seguro de que deseas eliminar al usuario{" "}
        <Text type="danger">{user?.usuario}</Text>?
      </Text>

      <div style={{ marginTop: 24 }}>
        <Space>
          <Button onClick={() => dispatch(closeModal())}>Cancelar</Button>
          <Button danger type="primary" onClick={handleDelete} loading={loading}>
            {loading ? "Eliminando..." : "Eliminar"}
          </Button>
        </Space>
      </div>
    </div>
  );
}
