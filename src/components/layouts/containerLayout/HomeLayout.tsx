import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import BottomBar from "../common/BottomBar.tsx";
import { useAppSelector } from "@redux/hooks.ts";
import { selectBottomBarOpen } from "@redux/slices/commonSlice.tsx";
import OverlayProvider from "@hooks/use-overlay/OverlayProvider.tsx";

export default function HomeLayout() {
  const bottomBarOpen = useAppSelector(selectBottomBarOpen);

  return (
    <OverlayProvider>
      <Box sx={{ pb: bottomBarOpen ? "82px" : 0 }}>
        <Box>
          <Outlet />
        </Box>
        <BottomBar />
      </Box>
    </OverlayProvider>
  );
}
