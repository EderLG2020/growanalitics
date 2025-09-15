import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../store/modalSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-bold">Soy un Modal 😎</h2>
        <p className="mt-2 text-gray-600">Este modal está controlado por Redux.</p>
        <button
          onClick={() => dispatch(closeModal())}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
