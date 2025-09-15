import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import "./index.css"; 
import '@ant-design/v5-patch-for-react-19';
import GlobalModal from "./components/GlobalModal";
import { App as AntdApp } from "antd"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AntdApp>  
      <App />
      <GlobalModal /> 
    </AntdApp>
  </Provider>
);
