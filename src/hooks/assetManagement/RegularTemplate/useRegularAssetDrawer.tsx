import { useOverlay } from "@hooks/use-overlay/useOverlay.tsx";
import ModifyRegularAssets from "@pages/AssetManagement/pages/RegularAsset/pages/ModifyRegularAssets";
import ModifyTemplate from "@pages/AssetManagement/pages/RegularAsset/pages/ModifyTemplate";
import { Template } from "@app/types/template.ts";
import React from "react";

export const useRegularAssetDrawer = () => {
  const { openOverlay, closeOverlay } = useOverlay();

  const openModifyTemplateDrawer = (template: Omit<Template, "amount">) => {
    openOverlay(
      <ModifyTemplate closeDrawer={closeOverlay} template={template} />
    );
  };

  const openModifyAssetDrawer = () => {
    openOverlay(<ModifyRegularAssets closeDrawer={closeOverlay} />);
  };

  return {
    closeDrawer: closeOverlay,
    openModifyAssetDrawer,
    openModifyTemplateDrawer,
  };
};
