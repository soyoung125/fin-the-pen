import CssBaseline from "@mui/material/CssBaseline";
import { Box, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import TopBar from "../common/TopBar";
import OverlayProvider from "@hooks/use-overlay/OverlayProvider.tsx";
import { Global } from "@emotion/react";

export default function RootLayout() {
  return (
    <OverlayProvider>
      <Paper
        sx={{
          height: "100dvh",
          maxWidth: "480px",
          mx: "auto",
        }}
      >
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              width: "100dvw",
              maxWidth: "480px",
              mx: "auto",
              left: "50%",
              translate: "-50%",
            },
            "*::-webkit-scrollbar": {
              display: "none",
            },
            // scrollbarWidth: "none",
          }}
        />
        <TopBar />
        <Box>
          <Outlet />
        </Box>
      </Paper>
    </OverlayProvider>
  );
}
