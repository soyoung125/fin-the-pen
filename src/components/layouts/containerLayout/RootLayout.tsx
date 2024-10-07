import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import TopBar from "../common/TopBar";
import OverlayProvider from "@hooks/use-overlay/OverlayProvider.tsx";

export default function RootLayout() {
  return (
    <OverlayProvider>
      <Box>
        <CssBaseline />
        <TopBar />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </OverlayProvider>
  );
}
