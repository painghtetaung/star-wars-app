import type { ThemeConfig } from "antd";

// This configuration set up globally
// Only updates when global style is needed for ant design components

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    fontFamily: "var(--font-poppins)",
    colorPrimary: "#1E46D2",
    colorLink: "#1E46D2",
  },
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

export default theme;
