import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import BottomBar from "../common/BottomBar.tsx";
import { useAppSelector } from "@redux/hooks.ts";
import { selectBottomBarOpen } from "@redux/slices/commonSlice.tsx";
import OverlayProvider from "@hooks/use-overlay/OverlayProvider.tsx";
import { useUser } from "@app/tanstack-query/useUser.ts";
import { useEffect } from "react";
import { getCookie } from "@utils/storage.ts";
import {
  COOKIE_KEY_ACCESS_TOKEN,
  COOKIE_KEY_REFRESH_TOKEN,
} from "@api/keys.ts";
import { QUERY_KEY_USER } from "@constants/queryKeys.ts";
import { useQueryClient } from "@tanstack/react-query";

export default function HomeLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const bottomBarOpen = useAppSelector(selectBottomBarOpen);

  const { data: user } = useUser();

  useEffect(() => {
    const accessToken = getCookie(COOKIE_KEY_ACCESS_TOKEN);

    if (!accessToken) {
      return navigate("/");
    }
    if (!user || Object.keys(user).length === 0) {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_USER],
      });
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
