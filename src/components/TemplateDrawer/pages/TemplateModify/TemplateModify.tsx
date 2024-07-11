import { ModifyHeader } from "@components/TemplateDrawer/components/Header";
import ListSwiper from "@components/TemplateDrawer/components/ListSwiper";
import TemplateModifyList from "@components/TemplateDrawer/pages/TemplateModify/components/TemplateModifyList";
import DeleteBox from "@components/TemplateDrawer/pages/TemplateModify/components/DeleteBox";
import { TemplatePageProps } from "@components/TemplateDrawer/TemplateDrawer.tsx";
import { useState } from "react";

function TemplateModify({
  spendSchedules,
  saveSchedules,
  handleBack,
  deleteTemplate,
}: TemplatePageProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const handleChange = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected(selected.concat(id));
    }
  };

  const handleDelete = () => {
    if (deleteTemplate) {
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
