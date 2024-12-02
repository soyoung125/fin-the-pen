import { createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "@redux/slices/settingSlice.ts";
import { darkThemeOptions, lightThemeOptions } from "@app/theme.ts";
import { koKR } from "@mui/material/locale";
import "moment/locale/ko";

/**
 * 다크모드 외에도 여러 가지 추가 설정이 올 수 있을것으로 기대하는 Wrapper Component
 */

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const isDarkMode: boolean = useSelector(selectIsDarkMode);
  const theme = createTheme(
    isDarkMode ? darkThemeOptions : lightThemeOptions,
    koKR
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default CustomThemeProvider;
