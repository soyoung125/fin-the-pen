import { Box, Stack } from "@mui/material";
import StatusCard from "@pages/AssetManagement/components/ScheduleStatusCard/components/StatusCard/StatusCard.tsx";

interface ScheduleStatusCardProps {
  month: string;
  numberOfSchedule: number;
  available: number;
}

function ScheduleStatusCard({
  month,
  numberOfSchedule,
  available,
}: ScheduleStatusCardProps) {
  return (
    <Stack px={2.5} spacing="21px">
      <Box sx={{ fontSize: 20, fontWeight: 500 }}>My 스케줄 현황</Box>
      <Stack direction="row" spacing={1}>
        <StatusCard
          title={`${month} 남은 일정`}
          content={`${numberOfSchedule}개`}
        />

        <StatusCard
          title="사용 가능 금액"
          content={`${available.toLocaleString()}원`}
        />
      </Stack>
    </Stack>
  );
}

export default ScheduleStatusCard;
/**
 * 이 파일은 공동으로 사용하는 곳이 많습니다. 위치를 옮기기 전에 고민이 필요함
 */
