import { ModifyHeader } from "@components/TemplateDrawer/components/Header";
import ListSwiper from "@components/TemplateDrawer/components/ListSwiper";
import TemplateModifyList from "@components/TemplateDrawer/pages/TemplateModify/components/TemplateModifyList";
import DeleteBox from "@components/TemplateDrawer/pages/TemplateModify/components/DeleteBox";
import { TemplatePageProps } from "@components/TemplateDrawer/TemplateDrawer.tsx";
import { useState } from "react";
import { useDialog } from "@hooks/dialog/useDialog.tsx";

function TemplateModify({
  spendSchedules,
  saveSchedules,
  handleBack,
  deleteTemplate,
}: TemplatePageProps) {
  const { openConfirm } = useDialog();
  const [selected, setSelected] = useState<number[]>([]);

  const handleChange = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected(selected.concat(id));
    }
  };

  const handleDelete = async () => {
    if (!deleteTemplate) return;
    const answer = await openConfirm({
      title: "알림",
      content: `정기 템플릿을 삭제할 경우,\n포함된 일정 내역이 모두 삭제됩니다.\n그래도 삭제하시겠습니까?`,
      approveText: "네",
      rejectText: "아니오",
    });
    if (answer) {
      deleteTemplate(selected);
      handleBack();
    }
  };

  return (
    <>
      <ModifyHeader handleBack={handleBack} />
      <ListSwiper
        spendScheduleList={
          <TemplateModifyList
            templates={spendSchedules}
            selected={selected}
            handleChange={handleChange}
          />
        }
        saveScheduleList={
          <TemplateModifyList
            templates={saveSchedules}
            selected={selected}
            handleChange={handleChange}
          />
        }
      />
      <DeleteBox handleDelete={handleDelete} handleCancel={handleBack} />
    </>
  );
}

export default TemplateModify;
