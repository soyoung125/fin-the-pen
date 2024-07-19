import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import { Button, Drawer } from "@mui/material";
import { ModifyContainer } from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleList/ModifButton.styles.ts";
import React, { ChangeEvent, useState } from "react";
import { ModifyRegularAssetsProps } from "@pages/AssetManagement/pages/RegularAsset/pages/ModifyRegularAssets/ModifyRegularAssets.tsx";
import FormContainer from "@pages/AssetManagement/pages/RegularAsset/pages/ModifyTemplate/components/FormContainer/FormContainer.tsx";
import { useModifyTemplate } from "@app/tanstack-query/templates/useModifyTemplate.ts";
import { useScheduleDrawer } from "@hooks/useScheduleDrawer.tsx";
import { Template } from "@app/types/template.ts";

export interface ModifyTemplateProps extends ModifyRegularAssetsProps {
  template: Omit<Template, "amount">;
}

function ModifyTemplate({ closeDrawer, template }: ModifyTemplateProps) {
  const { modifyTemplate } = useModifyTemplate();
  const [eventName, setEventName] = useState(template.template_name);
  const [categoryName, setCategoryName] = useState(template.category_name);
  const { openCategoryDrawer } = useScheduleDrawer();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEventName(event.target.value);
  };

  const handleClickCategory = async () => {
    const category = await openCategoryDrawer(categoryName);
    setCategoryName(category);
  };

  const handleSubmit = async () => {
    await modifyTemplate({
      user_id: template.user_id,
      event_name: eventName,
      category_name: categoryName,
      template_id: template.id.toString(),
    });
    closeDrawer();
  };

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

      <FormContainer
        category={categoryName}
        template_name={eventName}
        handleChange={handleChange}
        handleClick={handleClickCategory}
      />

      <ModifyContainer>
        <Button fullWidth onClick={handleSubmit}>
          수정 완료
        </Button>
      </ModifyContainer>
    </Drawer>
  );
}

export default ModifyTemplate;
