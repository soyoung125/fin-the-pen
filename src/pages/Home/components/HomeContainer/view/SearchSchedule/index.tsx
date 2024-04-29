import {
  Box,
  Button,
  CardActionArea,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import RoundedPaper from "@components/common/RoundedPaper.tsx";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@redux/hooks.ts";
import RoundedBorderBox from "@components/common/RoundedBorderBox.tsx";
import moment from "moment";
import "moment/locale/ko";
import { Schedule } from "@app/types/schedule.ts";
import useSchedule from "@hooks/useSchedule.ts";
import { fetchFindSchedules } from "@api/API.ts";
import useHeader from "@hooks/useHeader.ts";
import { HEADER_MODE } from "@app/types/common.ts";
import {
  setBottomBarOpenFalse,
  setBottomBarOpenTrue,
} from "@redux/slices/commonSlice.tsx";
import { useScheduleDrawer } from "@hooks/useScheduleDrawer.tsx";
import {
  INIT_PERIOD,
  INIT_REPEAT,
  SCHEDULE_REQUEST,
} from "@constants/schedule.ts";

function SearchSchedule() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [checkedSchedules, setCheckedSchedules] = useState<Schedule[]>([]);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(0);
  const [resultSchedules, setResultSchedules] = useState<Schedule[]>([]);

  const { schedules } = useSchedule();
  const { openScheduleDrawer } = useScheduleDrawer();

  useHeader(true, HEADER_MODE.search);

  useEffect(() => {
    dispatch(setBottomBarOpenFalse());
    return () => dispatch(setBottomBarOpenTrue()) as unknown as void;
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (inputRef.current) {
      const keyword = inputRef.current.value;
      const result = await fetchFindSchedules(keyword);
      if (result !== undefined) {
        setResultSchedules(result);
      } else {
        console.log("게스트 모드로 스케줄 검색");
        setResultSchedules([
          ...(schedules?.filter((s) =>
            s.event_name.toLowerCase().includes(keyword.toLowerCase())
          ) ?? []),
        ]);
      }
    }
  };

  const handleClick = (schedule: Schedule) => {
    const idx = checkedSchedules.indexOf(schedule);
    if (idx < 0) {
      setCheckedSchedules(checkedSchedules.concat(schedule));
    } else {
      setCheckedSchedules(checkedSchedules.filter((s) => s !== schedule));
    }
  };

  const handleDelete = () => {
    if (window.confirm("선택 일정을 삭제 하시겠습니까?")) {
      alert("아직 기능이 완성되지 않았습니다...");
      checkedSchedules.map((s) => {
        console.log(s?.schedule_id);
      });
    }
  };

  // const handleModify = (schedule: Schedule) => {
  //   setBottomDrawerOpen(true);
  //   setSelectedSchedule(schedule);
  // };

  const handleModal = (schedule: Schedule) => {
    // setBottomDrawerOpen(true); // 수정 drawer는 bottombar의 drawer를 공유할 수 있도록 수정 예정
    if (schedule) {
      const start = moment(schedule.start_date); // getMonthSchedule api 수정 후 제거 예정
      openScheduleDrawer(SCHEDULE_REQUEST(schedule));
    }
  };

  return (
    <>
      <Stack p={2} spacing={1}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 3,
            marginBottom: 1,
          }}
        >
          My 일정 검색하기
        </Typography>
        <RoundedPaper my={1}>
          <FormControl fullWidth>
            <OutlinedInput
              id="time"
              type="text"
              autoFocus
              onKeyDown={handleKeyPress}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon color="primary" />
                  </IconButton>
                </InputAdornment>
              }
              size="small"
              inputRef={inputRef}
            />
          </FormControl>
          {resultSchedules.map((schedule, index) => (
            <CardActionArea
              key={schedule.schedule_id}
              onClick={() => handleModal(schedule)}
            >
              <Box pb={1} />
              <RoundedBorderBox greyBorder={true}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ px: 1, py: 2 }}
                >
                  <Stack direction="row" spacing={1}>
                    <RoundedBorderBox greyBorder={true}>
                      <Box
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClick(schedule);
                        }}
                        sx={{
                          width: "30px",
                          height: "100%",
                          display: "grid",
                          placeItems: "center",
                          color: checkedSchedules.includes(schedule)
                            ? "white"
                            : "#979797",
                          backgroundColor: checkedSchedules.includes(schedule)
                            ? "primary.main"
                            : "null",
                        }}
                      >
                        {index + 1}
                      </Box>
                    </RoundedBorderBox>
                    <Stack>
                      <Box>
                        {moment(schedule.start_date).format("YYYY/MM/DD")}
                      </Box>
                      <Box>{`${schedule.start_time}~${schedule.end_time}`}</Box>
                    </Stack>
                  </Stack>
                  <Stack alignItems="flex-end">
                    <Box>{schedule.event_name}</Box>
                    <Box>{`${schedule.price_type} ${schedule.amount}`}</Box>
                  </Stack>
                </Stack>
              </RoundedBorderBox>
            </CardActionArea>
          ))}

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 1 }}
            disabled={checkedSchedules.length === 0}
            onClick={handleDelete}
          >
            선택 일정 삭제
          </Button>
        </RoundedPaper>
      </Stack>
    </>
  );
}

export default SearchSchedule;
