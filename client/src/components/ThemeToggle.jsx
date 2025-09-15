import { Switch } from "antd";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { isDark, setIsDark } = useTheme();

  return (
    <Switch
      checked={isDark}
      onChange={() => setIsDark(!isDark)}
      checkedChildren="🌙"
      unCheckedChildren="☀️"
    />
  );
}
