import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Tabla1 from "./pages/Tabla1";
import Tabla2 from "./pages/Tabla2";
import ThemeProvider from "./components/ThemeProvider";
import AuthProvider from "./providers/AuthProvider";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
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
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
