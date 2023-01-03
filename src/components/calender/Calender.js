/* eslint-disable react/jsx-props-no-spreading */
import { Box, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
// import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay/PickersDay';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate, selectedDate, selectEvents } from '../../utils/redux/event/eventSlice';

/**
 * --일정 스키마--
 * 고유 아이디 id
 * 유저 아이디 user_id
 * 날짜 date
 * 일정 시작 start_time
 * 일정 끝 end_time
 * 이벤트 이름 event_name
 * 타입(출금,입금) type
 * 금액 expected_spending
 * 예산 제외 exclusion
 * 카테고리 categories
 * 일정중요도 importance
 * + 정기 출금은??
 */

function Calender() {
  const dispatch = useDispatch();
  const value = useSelector(selectDate);
  const events = useSelector(selectEvents);
  const DATE_SIZE = 32;
  const DATE_HEIGHT = 50;
  // eslint-disable-next-line no-unused-vars
  const [fixedWithdrawal, setFixedWithdrawal] = React.useState(['2023/01/24']);

  React.useEffect(() => {
    dispatch(selectedDate(moment(new Date())));
  }, []);

  const renderDayInPicker = (day, _value, DayComponentProps) => {
    if (fixedWithdrawal.includes(day.format('YYYY/MM/DD'))) {
      return (
        <PickersDay
          sx={{
            border: 1, borderRadius: 2, marginBottom: 2, borderColor: 'warning.light',
          }}
          {...DayComponentProps}
        />
      );
    }

    const dayEvents = events.filter((e) => e.date === day.format('YYYY-MM-DD'));

    if (dayEvents.length > 0) {
      return (
        <Box sx={{ width: DATE_SIZE, marginX: 'auto' }}>
          <Stack>
            <PickersDay sx={{ marginBottom: 2 }} {...DayComponentProps} />
            <Stack direction="row" justifyContent="center" spacing={0.5} mt={0.1}>
              {dayEvents.map(() => ( // 추후 e의 카테고리 별로 색 바꿀 예정
                <Box
                  key={Math.random()}
                  sx={{
                    width: 0, height: 0, border: '2px solid', borderRadius: 3,
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </Box>
      );
    }

    return <PickersDay sx={{ marginBottom: 2 }} {...DayComponentProps} />;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box
        sx={{
          '& > div': {
            minWidth: '100%',
          },
          '& > div > div, & > div > div > div, & .MuiCalendarPicker-root': {
            width: '100%',
          },
          '& .MuiTypography-caption': {
            width: '100%',
            margin: 0,
          },
          '& .PrivatePickersSlideTransition-root': {
            minHeight: DATE_HEIGHT * 6,
          },
          '& .PrivatePickersSlideTransition-root [role="row"]': {
            margin: 0,
          },
          '& .MuiPickersDay-dayWithMargin': {
            margin: 0,
          },
          '& .MuiDayPicker-weekContainer': {
            height: DATE_HEIGHT,
          },
          '& .MuiPickersDay-root': {
            width: DATE_SIZE,
            height: DATE_SIZE,
            marginX: 'auto',
          },
          '& .MuiPickersDay-today': {
            border: 1,
            borderRadius: 2,
            borderColor: grey[100],
            backgroundColor: grey[100],
          },
          '& .MuiPickersDay-root:focus': {
            borderRadius: 2,
            backgroundColor: 'secondary.light',
            color: 'white',
            fontWeight: 'bold',
          },
        }}
      >
        <CalendarPicker
          views={['day']}
          displayStaticWrapperAs="desktop"
          value={value}
          onChange={(newValue) => {
            dispatch(selectedDate(newValue));
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderDay={renderDayInPicker}
        />
      </Box>
    </LocalizationProvider>
  );
}

export default Calender;

/**
 * 어떤 방식으로 작업할 지는 모르겠지만
 * 파일 명 등은 알아서 수정해주세요
 */
