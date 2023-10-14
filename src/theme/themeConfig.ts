import type { ThemeConfig } from "antd";
import { theme } from "antd";
// This configuration set up globally
// Only updates when global style is needed for ant design components
const { darkAlgorithm, compactAlgorithm } = theme;
const themeConfig: ThemeConfig = {
  token: {
    fontSize: 16,
    // colorText: "#FFF"
    // colorPrimary: "#FFF",
  },
  algorithm: [darkAlgorithm, compactAlgorithm],
  components: {
    Input: { borderRadius: 3, controlHeight: 48, colorBorder: "#B8B8B8" },
    Button: {
      borderRadius: 0,
    },
    Select: {
      controlHeight: 48,
      borderRadius: 3,
      colorBorder: "#B8B8B8",
    },
  },
};

export default themeConfig;
