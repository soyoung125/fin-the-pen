import { useState } from "react";
import { Header } from "@components/TemplateDrawer/components/Header";
import { Template } from "@app/types/template.ts";
import { AddModeInfo } from "@components/TemplateDrawer/TemplateDrawer.styles.ts";
import ListSwiper from "@components/TemplateDrawer/components/ListSwiper";
import useRegularAsset from "@hooks/assetManagement/useRegularAsset.ts";
import TemplateList from "@components/TemplateDrawer/pages/TemplateList";
import { useDialog } from "@hooks/dialog/useDialog.tsx";
import TemplateModify from "@components/TemplateDrawer/pages/TemplateModify";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constants/path.ts";
import useAsset from "@hooks/assetManagement/useAsset.ts";

export interface TemplateDrawerProps {
  closeDrawer: () => void;
  setSelected: (t: Template) => void;
}

export interface TemplatePageProps {
  spendSchedules: Template[];
  saveSchedules: Template[];
  handleBack: () => void;
  deleteTemplate?: (t: number[]) => void;
}

function TemplateDrawer({ closeDrawer, setSelected }: TemplateDrawerProps) {
  const [isModify, setIsModify] = useState(false);
  const { spendSchedules, saveSchedules, deleteTemplate } = useRegularAsset();
  const { openConfirm } = useDialog();
  const { setMenu } = useAsset();

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

  const handleModify = (v: string) => {
    if (v === "관리") {
      closeDrawer();
      setMenu(3);
    } else {
      setIsModify(true);
    }
  };

  if (isModify) {
    return (
      <TemplateModify
        spendSchedules={spendSchedules}
        saveSchedules={saveSchedules}
        handleBack={() => setIsModify(false)}
        deleteTemplate={deleteTemplate}
      />
    );
  }

  return (
    <>
      <Header closeAction={closeDrawer} handleModify={handleModify} />
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
