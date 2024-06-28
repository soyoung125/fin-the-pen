import { useOverlay } from "@hooks/use-overlay/useOverlay.tsx";
import { Box, SwipeableDrawer } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";

export const useSwipeableDrawer = () => {
  const { openOverlay, closeOverlay } = useOverlay();
  const toggleDrawer = (newOpen: boolean) => () => {
    !newOpen && closeOverlay();
  };

  const openDrawer = (children: ReactNode) => {
    openOverlay(
      <Box>
        <CssBaseline />
        <SwipeableDrawer
          anchor="bottom"
          open={true}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          disableSwipeToOpen={true}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            style: {
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              height: "calc(100dvh - 48px)",
            },
          }}
        >
          {children}
        </SwipeableDrawer>
      </Box>
    );
  };

  return { openDrawer, closeDrawer: closeOverlay };
};
