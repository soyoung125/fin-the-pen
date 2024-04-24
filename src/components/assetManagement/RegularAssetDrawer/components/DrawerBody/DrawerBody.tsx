import {
  DrawerBodyContainer,
  DrawerBodyItem,
  ItemInput,
  ItemTitle,
} from "@components/assetManagement/RegularAssetDrawer/components/DrawerBody/DrawerBody.styles.ts";
import { Stack, Typography } from "@mui/material";
import { useScheduleForm } from "@components/ScheduleDrawer/hooks/useScheduleForm.ts";

export interface DrawerBodyProps {
  title: string;
}

function DrawerBody({ title }: DrawerBodyProps) {
  const { scheduleForm, updateSchedule } = useScheduleForm();
  const changeSchedule = (state: { target: { id: string; value: string } }) => {
    updateSchedule(state);
  };

  return (
    <DrawerBodyContainer>
      <Stack
        spacing={3}
        px={2}
        py={3}
        sx={{
          borderRadius: "8px",
          boxShadow: "0 0 12px 0 rgba(0, 0, 0, 0.15)",
        }}
      >
        <Typography fontSize="22px" fontWeight={700}>
          {title}
        </Typography>

        <Stack spacing="10px">
          <DrawerBodyItem>
            <ItemTitle>일정 명</ItemTitle>
            <ItemInput
              id="event_name"
              value={scheduleForm?.event_name}
              onChange={changeSchedule}
            />
          </DrawerBodyItem>

          <DrawerBodyItem>
            <ItemTitle>카테고리</ItemTitle>
            <ItemInput
              value={scheduleForm?.event_name}
              // onChange={changeSchedule}
            />
          </DrawerBodyItem>

          <DrawerBodyItem>
            <ItemTitle>금액</ItemTitle>
            <ItemInput
              id={"set_amount"}
              value={scheduleForm?.set_amount}
              onChange={changeSchedule}
            />
          </DrawerBodyItem>

          <DrawerBodyItem>
            <ItemTitle>기간</ItemTitle>
            <ItemInput
              value={scheduleForm?.start_date}
              // onChange={changeSchedule}
            />
          </DrawerBodyItem>

          <DrawerBodyItem>
            <ItemTitle>반복</ItemTitle>
            <ItemInput
              value={scheduleForm?.event_name}
              // onChange={changeSchedule}
            />
          </DrawerBodyItem>

          <DrawerBodyItem>
            <ItemTitle>금액고정</ItemTitle>
            <ItemInput
              value={scheduleForm?.event_name}
              onChange={changeSchedule}
            />
          </DrawerBodyItem>

          <DrawerBodyItem>
            <ItemTitle>금액관리</ItemTitle>
            <ItemInput
              value={scheduleForm?.event_name}
              onChange={changeSchedule}
            />
          </DrawerBodyItem>
        </Stack>
      </Stack>
    </DrawerBodyContainer>
  );
}

export default DrawerBody;
