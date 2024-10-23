import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import TopBar from "../common/TopBar";
import OverlayProvider from "@hooks/use-overlay/OverlayProvider.tsx";

export default function RootLayout() {
  return (
    <OverlayProvider>
      <Box
        sx={{ height: "100dvh", maxWidth: "480px", mx: "auto", boxShadow: 1 }}
      >
        <CssBaseline />
        <TopBar />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </OverlayProvider>
  );
}
