import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import { Drawer } from "@mui/material";
import DrawerAction from "@components/assetManagement/RegularAssetDrawer/components/DrawerAction";
import DrawerBody from "@components/assetManagement/RegularAssetDrawer/components/DrawerBody";

export interface RegularAssetDrawerProps {
  closeDrawer: () => void;
  title: string;
}

function RegularAssetDrawer({ closeDrawer, title }: RegularAssetDrawerProps) {
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

      <DrawerBody title={title} />

      <DrawerAction
        handleCancel={() => alert("")}
        handleSubmit={() => alert("")}
      />
    </Drawer>
  );
}

export default RegularAssetDrawer;
