import RegularScheduleCard from "pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleCard";
import { FormControlLabel, FormGroup } from "@mui/material";
import ScheduleCardSkeleton from "@components/ScheduleList/ScheduleCard/ScheduleCardSkeleton.tsx";
import React, { useState } from "react";
import { RequestSchedule, Schedule } from "@app/types/schedule.ts";
import { SCHEDULE_REQUEST } from "@constants/schedule.ts";
import { useScheduleDrawer } from "@hooks/useScheduleDrawer.tsx";
import Modify from "@assets/icons/modify_white.svg";
import {
  ModifyButtonContainer,
  ModifyContainer,
  ModifyText,
} from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleList/ModifButton.styles.ts";
import CheckBox from "@components/common/CheckBox";
import {
  ModifyTemplateRequest,
  ModifyTemplateSchedulesRequest,
  TemplateSchedulesRequest,
} from "@app/types/template.ts";

export interface RegularScheduleListProps {
  isPending: boolean;
  schedules: Schedule[];
  modifyTemplateSchedules: (idList: string) => Promise<void>;
}

function RegularScheduleList({
  schedules,
  isPending,
  modifyTemplateSchedules,
}: RegularScheduleListProps) {
  const [isModify, setIsModify] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const { openScheduleAssetDrawer } = useScheduleDrawer();

  if (isPending) {
    return Array.from({ length: 6 }, () => 0).map((num) => (
      <ScheduleCardSkeleton key={num} />
    ));
  }

  const handleCancel = () => {
    setIsModify(false);
    setSelected([]);
  };

  const handleModify = async (idList: string) => {
    await modifyTemplateSchedules(idList);
    setIsModify(false);
  };

  const handleModal = (schedule?: Schedule) => {
    const newSchedule =
      schedule ?? schedules.find((s) => s.schedule_id === selected[0]);
    const idList = schedule ? schedule.schedule_id : selected.join(",");
    const count = schedule ? 1 : selected.length;
    newSchedule &&
      openScheduleAssetDrawer(SCHEDULE_REQUEST(newSchedule), count, () =>
        handleModify(idList ?? "")
      );
  };

  const handleChange = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected(selected.concat(id));
    }
  };

  if (isModify) {
    return (
      <>
        <FormGroup sx={{ pb: "80px" }}>
          {schedules.map(
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
          <ModifyText $isDelete onClick={handleCancel}>
            취소
          </ModifyText>
          <ModifyText onClick={() => handleModal()}>선택 일정 수정</ModifyText>
        </ModifyContainer>
      </>
    );
  }

  return (
    <>
      {schedules.map((s) => (
        <RegularScheduleCard
          key={s.schedule_id}
          priceType={s.price_type}
          eventName={s.event_name}
          amount={Number(s.amount)}
          date={s.start_date}
          onClick={() => handleModal(s)}
        />
      ))}
      <ModifyButtonContainer onClick={() => setIsModify(true)}>
        <img src={Modify} alt="modify" />
      </ModifyButtonContainer>
    </>
  );
}

export default RegularScheduleList;
