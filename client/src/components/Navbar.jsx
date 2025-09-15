import { Avatar, Dropdown,message } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import {logoutService} from "../api/auth"
import { themeColors } from "../config/theme";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const { isDark } = useTheme();
  const colors = isDark ? themeColors.dark : themeColors.light;
  const navigate= useNavigate();
  const dispatch = useDispatch();

  const handleMenuClick = async({ key }) => {
    if (key === "logout") {
      try {
        await logoutService();
        message.success("Sesión cerrada correctamente");
  
        dispatch(logout()); 
        navigate("/");
      } catch (err) {
        console.error("Error cerrando sesión:", err);
        message.error("No se pudo cerrar sesión");
      }
    }
  };

  const menuItems = [
    {
      key: "profile",
      label: "Mi Perfil",
      icon: <UserOutlined />,
    },
    {
      key: "logout",
      label: "Cerrar sesión",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <header
      className={`flex items-center justify-between px-6 py-4 shadow-md transition-colors duration-300 ${colors.sidebar}`}
    >
      <h1 className={`text-lg font-bold ${colors.text}`}>GROW ANALYTICS</h1>

      <nav className="flex items-center gap-4">
        <ThemeToggle />

        <Dropdown
          menu={{ items: menuItems, onClick: handleMenuClick }}
          placement="bottomRight"
          arrow
        >
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{ cursor: "pointer", backgroundColor: colors.primary }}
          />
        </Dropdown>
      </nav>
    </header>
  );
}
