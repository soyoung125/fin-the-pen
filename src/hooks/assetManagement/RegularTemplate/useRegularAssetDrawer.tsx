import { useOverlay } from "@hooks/use-overlay/useOverlay.tsx";
import ModifyRegularAssets from "@pages/AssetManagement/pages/RegularAsset/pages/ModifyRegularAssets";

export const useRegularAssetDrawer = () => {
  const { openOverlay, closeOverlay } = useOverlay();

  const openAddTemplateDrawer = () => {
    openOverlay(<></>);
  };

  const openModifyAssetDrawer = () => {
    openOverlay(<ModifyRegularAssets closeDrawer={closeOverlay} />);
  };

  return {
    closeDrawer: closeOverlay,
    openModifyAssetDrawer,
    openAddTemplateDrawer,
  };
};
