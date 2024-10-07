/* eslint-disable */
import { ThemeOptions } from "@mui/material/styles";

const commonThemeOptions: ThemeOptions = {
  // props: {
  //   MuiTooltip: {
  //     arrow: true,
  //   },
  // },
  typography: {
    fontFamily: "Pretendard",
    fontSize: 14,
    button: {
      fontSize: 16,
      fontWeight: 500,
    },
    h6: {
      fontSize: 15,
      fontWeight: 700,
    },
    h5: {
      fontSize: 16,
      fontWeight: 400,
    },
    h4: {
      fontSize: 16,
      fontWeight: 500,
    },
    h3: {
      fontSize: 17,
      fontWeight: 500,
    },
    h2: {
      fontSize: 18,
      fontWeight: 500,
    },
    h1: {
      fontSize: 20,
      fontWeight: 700,
    },
    caption: {
      fontSize: 14,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 15,
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: 12,
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: "none",
        },
        outlined: {
          border: "1.4px solid",
        },
        sizeSmall: {
          paddingY: 7,
        },
        sizeMedium: {
          paddingY: 8,
        },
        sizeLarge: {
          paddingY: 10,
        },
      },
    },
  },
};

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#735BF2",
    },
    secondary: {
      main: "#C8CBD0",
      light: "#DEE0E3",
      dark: "#8C919C",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#E82A2A",
      light: "#ef5350",
    },
    warning: {
      main: "#FFBE16",
      light: "#ff9800",
    },
    success: {
      main: "#0E9B35",
    },
    info: {
      main: "#0075FF",
    },
    divider: "#F7F7F8",
    text: {
      primary: "#131416",
      secondary: "#A9ACB2",
    },
  },
  ...commonThemeOptions,
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#44b9d6",
    },
    secondary: {
      main: "#7497a4",
    },
    background: {
      default: "#2a2e33",
      paper: "#12293b",
    },
    text: {
      primary: "#eaeded",
      secondary: "#44b9d6",
    },
  },
  ...commonThemeOptions,
};
