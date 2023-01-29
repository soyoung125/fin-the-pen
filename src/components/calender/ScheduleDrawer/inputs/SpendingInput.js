import {
  Button, Stack, TextField, Typography,
} from '@mui/material';
import { SCHEDULE_DRAWER } from '../../../../utils/constants/schedule';
import { updateSchedule, updateSpendingType } from '../utils/schedule';

function SpendingInput({
  schedule, setSchedule, mode,
}) {
  const changeSpendingType = () => {
    updateSpendingType(schedule, setSchedule);
  };
  const changeSchedule = (state) => {
    updateSchedule(schedule, setSchedule, state);
  };
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" p={1}>
      <Typography>{SCHEDULE_DRAWER.set_spending_title}</Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        {(mode === 'create') || (schedule.type === SCHEDULE_DRAWER.type_plus)
          ? (
            <Button
              variant={schedule.type === SCHEDULE_DRAWER.type_plus ? 'contained' : 'outlined'}
              id="type"
              value={SCHEDULE_DRAWER.type_plus}
              onClick={mode === 'create' ? changeSchedule : changeSpendingType}
              size="small"
              sx={{
                borderRadius: 5, minWidth: 0, width: '30px', height: '30px',
              }}
            >
              {SCHEDULE_DRAWER.type_plus}
            </Button>
          )
          : null}
        {(mode === 'create') || (schedule.type === SCHEDULE_DRAWER.type_minus)
          ? (
            <Button
              variant={schedule.type === SCHEDULE_DRAWER.type_minus ? 'contained' : 'outlined'}
              id="type"
              value={SCHEDULE_DRAWER.type_minus}
              onClick={mode === 'create' ? changeSchedule : changeSpendingType}
              size="small"
              sx={{
                borderRadius: 5, minWidth: 0, width: '30px', height: '30px',
              }}
            >
              {SCHEDULE_DRAWER.type_minus}
            </Button>
          )
          : null}
        <TextField
          id="expected_spending"
          value={schedule.expected_spending}
          onChange={changeSchedule}
          label={SCHEDULE_DRAWER.expected_spending}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: '20vw' }}
          size="small"
        />
        <Typography>{SCHEDULE_DRAWER.won}</Typography>
      </Stack>
    </Stack>
  );
}
export default SpendingInput;
