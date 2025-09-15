import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    title: "",
    type: null,
    props: {},
    footer: null,
    width: 600,
  },
  reducers: {
    openModal: (state, action) => {
      const { title, type, props, footer, width } = action.payload;
      state.isOpen = true;
      state.title = title || "";
      state.type = type || null;
      state.props = props || {};
      state.footer = footer ?? null;
      state.width = width || 600;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.props = {};
      state.title = "";
      state.footer = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
