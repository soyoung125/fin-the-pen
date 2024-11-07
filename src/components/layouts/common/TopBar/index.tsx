import { Box, Stack } from "@mui/material";
import {
  selectHeaderMode,
  selectHeaderOpen,
} from "@redux/slices/commonSlice.tsx";
import AnalysisMode from "./headerMode/AnalysisMode.tsx";
import HomeMode from "./headerMode/HomeMode.tsx";
import { useAppSelector } from "@redux/hooks.ts";
import SettingsMode from "./headerMode/SettingsMode.tsx";
import SignMode from "./headerMode/SignMode.tsx";
import SearchMode from "./headerMode/SearchMode.tsx";
import AssetMode from "./headerMode/AssetMode.tsx";

function TopBar() {
  const isHeaderOpen = useAppSelector(selectHeaderOpen);
  const headerMode = useAppSelector(selectHeaderMode);

  return (
    isHeaderOpen && (
      <>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "#FFF",
            zIndex: 1000,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ paddingX: "20px", height: 40 }}
          >
            {headerMode === "home" && <HomeMode />}
            {headerMode === "analysis" && <AnalysisMode />}
            {headerMode === "settings" && <SettingsMode />}
            {headerMode === "sign" && <SignMode />}
            {headerMode === "search" && <SearchMode />}
            {headerMode === "assetManagement" && <AssetMode />}
          </Stack>
        </Box>
      </>
    )
  );
}

export default TopBar;
/**
 * 상단 바
 */
