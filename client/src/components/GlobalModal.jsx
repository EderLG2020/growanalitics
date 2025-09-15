import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../store/modalSlice";
import EditUserForm from "./EditUserForm";
import ConfirmDeleteUser from "./ConfirmDeleteUser";

export default function GlobalModal() {
  const dispatch = useDispatch();
  const { isOpen, title, type, props, footer, width } = useSelector(
    (state) => state.modal
  );

  let content = null;
  if (type === "editUser") content = <EditUserForm {...props} />;
  if (type === "confirmDeleteUser") content = <ConfirmDeleteUser {...props} />;


  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={() => dispatch(closeModal())}
      footer={footer}
      width={width}
    >
      {content}
    </Modal>
  );
}
