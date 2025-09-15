import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "../src/pages/Login";
import AuthLayout from "./layouts/AuthLayout";
import Tabla1 from "./pages/Tabla1";
import Tabla2 from "./pages/Tabla2";
import DashboardLayout from "./layouts/DashboardLayout";
import ThemeProvider from "./components/ThemeProvider";
import Signup from "./pages/Signup";


export default function App() {
  return (
    <BrowserRouter>
    <ThemeProvider>
     <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/signup" element={<AuthLayout />}>
          <Route index element={<Signup />} />
        </Route>

        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >

       
          <Route path="tabla1" element={<Tabla1 />} />
          <Route path="tabla2" element={<Tabla2 />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
