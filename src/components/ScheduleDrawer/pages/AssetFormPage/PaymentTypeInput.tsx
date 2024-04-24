import { Button, Stack, Typography } from "@mui/material";
import { PAYMENT_TYPE, SCHEDULE_DRAWER } from "@constants/schedule.ts";
import { useScheduleForm } from "../../hooks/useScheduleForm.ts";
import { MouseEvent } from "react";

function PaymentTypeInput() {
  const { scheduleForm, updateSchedule } = useScheduleForm();

  const changeSchedule = (state: MouseEvent<HTMLButtonElement>) => {
    updateSchedule({
      target: { id: state.currentTarget.id, value: state.currentTarget.value },
    });
  };

  return (
    <Stack spacing="10px" px={2.5}>
      <Typography
        variant="h4"
        sx={{ color: "primary.main", py: 1, borderBottom: "1px solid #F7F7F8" }}
      >
        {SCHEDULE_DRAWER.set_payment_type_title}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1}>
        {PAYMENT_TYPE.map((type) => (
          <Button
            key={type.id}
            variant="contained"
            color={
              scheduleForm?.payment_type === type.value
                ? "primary"
                : "secondary"
            }
            id="payment_type"
            value={type.value}
            onClick={changeSchedule}
            fullWidth
            sx={{
              borderRadius: "17px",
            }}
          >
            {type.label}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}

export default PaymentTypeInput;
