import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import { Drawer, FormControlLabel, FormGroup } from "@mui/material";
import CheckBox from "@components/common/CheckBox";
import RegularScheduleCard from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleCard";
import {
  ModifyContainer,
  ModifyText,
} from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleList/ModifButton.styles.ts";
import React, { useState } from "react";
import { useScheduleDrawer } from "@hooks/useScheduleDrawer.tsx";
import useRegularAssetInfo from "@hooks/assetManagement/RegularTemplate/useRegularAssetInfo.ts";
import { ModifyTemplateRequest } from "@app/types/template.ts";
import { SCHEDULE_REQUEST } from "@constants/schedule.ts";
import ScheduleListHeader from "@components/ScheduleList/ScheduleListHeader";

export interface ModifyRegularAssetsProps {
  closeDrawer: () => void;
}

function ModifyRegularAssets({ closeDrawer }: ModifyRegularAssetsProps) {
  const { openScheduleAssetDrawer } = useScheduleDrawer();
  const {
    handleModifyTemplateSchedule,
    detailSchedules,
    options,
    selectedOption,
    handleChangeOption,
  } = useRegularAssetInfo();
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected(selected.concat(id));
    }
  };

  const handleClose = () => {
    setSelected([]);
    closeDrawer();
  };

  const handleModify = async (idList: string, data: ModifyTemplateRequest) => {
    await handleModifyTemplateSchedule(idList, data);
    handleClose();
  };

  const handleModal = () => {
    const newSchedule = detailSchedules.find(
      (s) => s.schedule_id === selected[0]
    );
    const idList = selected.join(",");
    const count = selected.length;
    newSchedule &&
      openScheduleAssetDrawer(
        SCHEDULE_REQUEST(newSchedule),
        (data) => handleModify(idList ?? "", data),
        count
      );
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
      <TopNavigationBar onClick={closeDrawer} title={"정기 템플릿 상세"} />

      <ScheduleListHeader
        count={detailSchedules.length}
        options={options}
        selectedOption={selectedOption}
        setSelectedOption={handleChangeOption}
      />

      <FormGroup sx={{ pb: "80px" }}>
        {detailSchedules.map(
          (s) =>
            s.schedule_id && (
              <FormControlLabel
                key={s.schedule_id}
                sx={{ pl: "16px", m: 0 }}
                control={
                  <CheckBox
                    checked={selected.includes(s.schedule_id)}
                    handleChange={() => handleChange(s.schedule_id ?? "0")}
                  />
                }
                label={
                  <RegularScheduleCard
                    key={s.schedule_id}
                    priceType={s.price_type}
                    eventName={s.event_name}
                    amount={Number(s.amount)}
                    date={s.start_date}
                  />
                }
                slotProps={{
                  typography: {
                    flexGrow: 1,
                  },
                }}
              />
            )
        )}
      </FormGroup>

      <ModifyContainer>
        <ModifyText $isDelete onClick={() => alert("")}>
          삭제
        </ModifyText>
        <ModifyText onClick={handleModal}>선택 일정 수정</ModifyText>
      </ModifyContainer>
    </Drawer>
  );
}

export default ModifyRegularAssets;
