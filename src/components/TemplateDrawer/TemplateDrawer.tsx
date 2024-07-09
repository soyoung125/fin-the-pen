import { useState } from "react";
import {
  Header,
  ModifyHeader,
} from "@components/TemplateDrawer/components/Header";
import { Template } from "@app/types/template.ts";
import { AddModeInfo } from "@components/TemplateDrawer/TemplateDrawer.styles.ts";
import ListSwiper from "@components/TemplateDrawer/components/ListSwiper";
import useRegularAsset from "@hooks/assetManagement/useRegularAsset.ts";
import TemplateList from "@components/TemplateDrawer/pages/TemplateList";
import { useDialog } from "@hooks/dialog/useDialog.tsx";

export interface TemplateDrawerProps {
  closeDrawer: () => void;
  setSelected: (t: Template) => void;
}

function TemplateDrawer({ closeDrawer, setSelected }: TemplateDrawerProps) {
  const [isModify, setIsModify] = useState(false);
  const { spendSchedules, saveSchedules } = useRegularAsset();
  const { openConfirm } = useDialog();

  const handleClick = async (t: Template) => {
    const answer = await openConfirm({
      title: "알림",
      content: `${t.template_name}/${t.category_name} 으로 설정하시겠습니까?`,
      approveText: "네",
      rejectText: "아니오",
    });
    if (answer) {
      setSelected(t);
      closeDrawer();
    }
  };

  if (isModify) {
    return (
      <>
        <ModifyHeader handleBack={() => setIsModify(false)} />
      </>
    );
  }

  return (
    <>
      <Header
        closeAction={closeDrawer}
        handleModify={() => setIsModify(true)}
      />
      <AddModeInfo>적용할 템플릿을 선택하세요 !</AddModeInfo>
      <ListSwiper
        spendScheduleList={
          <TemplateList templates={spendSchedules} setSelected={handleClick} />
        }
        saveScheduleList={
          <TemplateList templates={saveSchedules} setSelected={handleClick} />
        }
      />
    </>
  );
}

export default TemplateDrawer;
