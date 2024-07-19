import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import DrawerAction from "@components/assetManagement/RegularAssetDrawer/components/DrawerAction";
import { Drawer } from "@mui/material";

export interface DeleteRegularAssetsProps {
  closeDrawer: () => void;
}

function DeleteRegularAssets({ closeDrawer }: DeleteRegularAssetsProps) {
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
      <TopNavigationBar onClick={closeDrawer} title="정기 입출금액 설정" />

      <DrawerAction
        handleCancel={() => alert("")}
        handleSubmit={() => alert("")}
      />
    </Drawer>
  );
}

export default DeleteRegularAssets;
