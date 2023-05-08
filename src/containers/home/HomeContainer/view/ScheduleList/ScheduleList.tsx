import {
  Box, CircularProgress, Drawer, Stack, Typography,
} from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ScheduleDrawer from '../../../ScheduleDrawer';
import { CATEGORIES, Category } from '../../../../../domain/constants/categories';
import { SCHEDULE_DRAWER_MODE } from '../../../../../domain/constants/schedule';
import { selectDate, selectStatus } from '../../../../../app/redux/slices/scheduleSlice';
import ScheduleCard from './ScheduleCard';
import { Schedule } from '../../../../../types/schedule';
import useSchedule from '../../../../../hooks/useSchedule';

function ScheduleList() {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const status = useSelector(selectStatus);
  const date = moment(useSelector(selectDate)).format('YYYY-MM-DD');
  const [todaySchedules, setTodaySchedules] = useState<Schedule[]>([]);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);

  const { schedules } = useSchedule();

  const handleModal = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setBottomDrawerOpen(true);
  };

  useEffect(() => {
    setTodaySchedules(schedules.filter((schedule) => schedule.date === date));
  }, [schedules]);

  const [drawerWidth, setDrawerWidth] = useState(0);

  return (
    <>
      { // 로딩 시 Spinner
        status === 'loading' && (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box my={5}>
              <CircularProgress />
            </Box>
          </Stack>
        )
      }
      { // 당일 스케쥴이 없는 경우
        todaySchedules.length === 0 && (
          <Stack
            justifyContent="center"
            alignItems="center"
          >
            <Box my={5}>
              <Typography>
                {date}
                에 등록된 일정이 없습니다!
              </Typography>
            </Box>
          </Stack>
        )
      }
      { // 당일 스케쥴 카드 리스트
        todaySchedules.map((schedule) => (
          <ScheduleCard
            schedule={schedule}
            category={(CATEGORIES.find((c) => c.title === schedule.category) || { color: '#C8A2C8' } as Category)}
            key={Math.random()}
            handleModal={handleModal}
          />
        ))
      }

      <Drawer
        open={bottomDrawerOpen}
        anchor="bottom"
        onClose={() => setBottomDrawerOpen(false)}
        // Drawer를 가운데로 위치할 수 있도록 도와줌. resize는 이후 업데이트 예정
        PaperProps={{
          sx: {
            maxWidth: '400px',
            marginX: drawerWidth === 400 ? `calc((100% - ${drawerWidth}px)/2)` : null,
          },
        }}
      >
        {/* 이 부분을 범용적으로 사용할 수 있게 만드는 건 어떨까? */}
        <ScheduleDrawer
          setDrawerWidth={setDrawerWidth}
          handleClose={() => setBottomDrawerOpen(false)}
          data={selectedSchedule as Schedule}
          mode={SCHEDULE_DRAWER_MODE.modify}
        />
      </Drawer>
    </>
  );
}

export default ScheduleList;
