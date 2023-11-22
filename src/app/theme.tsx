/* eslint-disable */
import { ThemeOptions } from "@mui/material/styles";

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
    },
    warning: {
      main: "#FFBE16",
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
  // props: {
  //   MuiTooltip: {
  //     arrow: true,
  //   },
  // },
  typography: {
    fontFamily: "Noto Sans KR",
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
  typography: {
    fontFamily: "Noto Sans KR",
  },
};
