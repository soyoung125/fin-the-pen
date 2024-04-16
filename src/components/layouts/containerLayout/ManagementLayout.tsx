import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import EasyAuthentication from "@components/sign/EasyAuthentication";
import useHeader from "@hooks/useHeader.ts";
import { HEADER_MODE } from "@app/types/common.ts";
import { useAppSelector } from "@redux/hooks.ts";
import { selectIsAuthenticated } from "@redux/slices/commonSlice.tsx";

function ManagementLayout() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useHeader(true, HEADER_MODE.assetManagement);

  return (
    <>
      <EasyAuthentication />
      {isAuthenticated && (
        <Box sx={{ wordBreak: "keep-all", fontWeight: "bold" }}>
          <Outlet />
        </Box>
      )}
    </>
  );
}

export default ManagementLayout;
