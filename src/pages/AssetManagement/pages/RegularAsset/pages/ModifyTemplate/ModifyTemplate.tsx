import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import { Button, Drawer } from "@mui/material";
import {
  ModifyContainer,
  ModifyText,
} from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleList/ModifButton.styles.ts";
import React from "react";
import { ModifyRegularAssetsProps } from "@pages/AssetManagement/pages/RegularAsset/pages/ModifyRegularAssets/ModifyRegularAssets.tsx";

function ModifyTemplate({ closeDrawer }: ModifyRegularAssetsProps) {
  return (
    <Drawer
      open={true}
      anchor="bottom"
      onClose={closeDrawer}
      sx={{
        height: "100dvh",
        ".MuiPaper-root.MuiDrawer-paper": {
          maxHeight: "100dvh",
          height: "100dvh",
        },
      }}
    >
      <TopNavigationBar onClick={closeDrawer} title={"정기 템플릿 수정"} />

      <ModifyContainer>
        <Button fullWidth onClick={() => alert("")}>
          수정 완료
        </Button>
      </ModifyContainer>
    </Drawer>
  );
}

export default ModifyTemplate;
