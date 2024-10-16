import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import BottomBar from "../common/BottomBar.tsx";
import { useAppSelector } from "@redux/hooks.ts";
import { selectBottomBarOpen } from "@redux/slices/commonSlice.tsx";
import OverlayProvider from "@hooks/use-overlay/OverlayProvider.tsx";
import { useUser } from "@app/tanstack-query/useUser.ts";
import { useEffect } from "react";

export default function HomeLayout() {
  const navigate = useNavigate();

  const bottomBarOpen = useAppSelector(selectBottomBarOpen);

  const { data: user } = useUser();

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      return navigate("/");
    }
  }, [user]);

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
