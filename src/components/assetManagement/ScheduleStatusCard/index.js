import { Box, Stack } from '@mui/material';
import StatusStack from './StatusStack';

function ScheduleStatusCard({ month, numberOfSchedule }) {
  return (
    <>
      <Box sx={{ typography: 'h6', fontWeight: 'bold' }}>
        My 스케줄 현황
      </Box>
      <Box sx={{
        marginTop: 1, border: '2px solid', borderRadius: 2, borderColor: 'primary.main',
      }}
      >
        <Stack direction="row">
          <StatusStack
            title={`${month} 남은 일정`}
            content={`${numberOfSchedule}개`}
          />

          <StatusStack
            title="추천 소비 금액"
            content="xxxxx원"
          />
        </Stack>
      </Box>

    </>
  );
}

export default ScheduleStatusCard;
