import { ConfigProvider, theme } from "antd";
import { createContext, useContext, useState, useEffect } from "react";

// Creamos un contexto para acceder al tema desde cualquier parte
const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useState(prefersDark);

  // Sincronizar con cambios del SO (si el usuario cambia manualmente)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: isDark ? "#177ddc" : "#1890ff", // Ejemplo de customización
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

// Hook para acceder al tema
export const useTheme = () => useContext(ThemeContext);
