import RegularScheduleCard from "pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleCard";
import { FormControlLabel, FormGroup } from "@mui/material";
import ScheduleCardSkeleton from "@components/ScheduleList/ScheduleCard/ScheduleCardSkeleton.tsx";
import React, { useState } from "react";
import { Schedule } from "@app/types/schedule.ts";
import { SCHEDULE_REQUEST } from "@constants/schedule.ts";
import { useScheduleDrawer } from "@hooks/useScheduleDrawer.tsx";
import { RegularTemplateListProps } from "@pages/AssetManagement/pages/RegularAsset/components/RegularTemplateList/RegularTemplateList.tsx";
import Modify from "@assets/icons/modify_white.svg";
import {
  ModifyButtonContainer,
  ModifyContainer,
  ModifyText,
} from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleList/ModifButton.styles.ts";
import CheckBox from "@components/common/CheckBox";

function RegularScheduleList({
  schedules,
  isPending,
}: RegularTemplateListProps) {
  const [isModify, setIsModify] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const { openScheduleDrawer } = useScheduleDrawer();

  if (isPending) {
    return Array.from({ length: 6 }, () => 0).map((num) => (
      <ScheduleCardSkeleton key={num} />
    ));
  }

  const handleModal = (schedule: Schedule) => {
    if (schedule) {
      openScheduleDrawer(SCHEDULE_REQUEST(schedule));
    }
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
              s.id && (
                <FormControlLabel
                  key={s.id}
                  sx={{ pl: "16px", m: 0 }}
                  control={
                    <CheckBox
                      checked={selected.includes(s.id)}
                      handleChange={() => handleChange(s.id ?? "0")}
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
          <ModifyText $isDelete onClick={() => setIsModify(false)}>
            취소
          </ModifyText>
          <ModifyText>선택 일정 수정</ModifyText>
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
