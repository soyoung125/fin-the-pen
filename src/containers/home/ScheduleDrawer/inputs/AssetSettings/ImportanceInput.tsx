import { Button, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  IMPORTANCES,
  SCHEDULE_DRAWER,
} from "../../../../../constants/schedule";
import { selectSchedule } from "../../../../../app/redux/slices/scheduleSlice";
import { updateSchedule } from "../../domain/schedule";
import { useAppDispatch } from "../../../../../app/redux/hooks";

function ImportanceInput() {
  const dispatch = useAppDispatch();
  const schedule = useSelector(selectSchedule);

  const changeSchedule = (state: React.MouseEvent<HTMLButtonElement>) => {
    updateSchedule(dispatch, schedule, {
      target: { id: state.currentTarget.id, value: state.currentTarget.value },
    });
  };

  return (
    <Stack spacing={2} px={2.5}>
      <Typography sx={{ fontWeight: 500 }}>
        {SCHEDULE_DRAWER.set_importance_title}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1}>
        {IMPORTANCES.map((importance) => (
          <Button
            variant="contained"
            color={
              schedule?.importance === importance.value
                ? "primary"
                : "secondary"
            }
            id="importance"
            value={importance.value}
            onClick={changeSchedule}
            fullWidth
            size="small"
            sx={{
              borderRadius: "17px",
            }}
          >
            {importance.label}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
export default ImportanceInput;
