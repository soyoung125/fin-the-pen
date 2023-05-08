import {
  Stack, Typography,
} from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate, selectedDate } from '../../../../../app/redux/slices/scheduleSlice';
import { calculateIncomeExpenditure } from '../../../../../domain/tools';
import StatusStack from '../../../../../components/assetManagement/ScheduleStatusCard/StatusStack';
import SwitchingHeader from '../../../../../components/common/SwitchingHeader';
import RoundedPaper from '../../../../../components/common/RoundedPaper';
import RoundedBorderBox from '../../../../../components/common/RoundedBorderBox';
import useSchedule from '../../../../../hooks/useSchedule';

function MonthlyStatement() {
  const dispatch = useDispatch();
  const { schedules } = useSchedule();
  const date = useSelector(selectDate);

  return (
    <RoundedPaper my={2}>
      <SwitchingHeader
        justifyContent="space-between"
        handleClickLeftArrow={() => dispatch(selectedDate(moment(date).subtract(1, 'months')))}
        handleClickRightArrow={() => dispatch(selectedDate(moment(date).add(1, 'months')))}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{`${moment(date).format('M')}월`}</Typography>
        <Typography variant="caption">{moment(date).format('YYYY')}</Typography>
      </SwitchingHeader>

      <RoundedBorderBox>
        <Stack direction="row" spacing={2} p={2}>
          <StatusStack
            title="수입"
            content={`+${calculateIncomeExpenditure(schedules, (s: { date: moment.Moment; }) => moment(date).isSame(s.date, 'month'), '+')}`}
          />

          <StatusStack
            title="지출"
            content={`-${calculateIncomeExpenditure(schedules, (s: { date: moment.Moment; }) => moment(date).isSame(s.date, 'month'), '-')}`}
          />
        </Stack>
      </RoundedBorderBox>
    </RoundedPaper>
  );
}

export default MonthlyStatement;
