import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { setSchedules } from "@redux/slices/scheduleSlice.tsx";
import ModalStaticBackdrop from "@components/layouts/ModalStaticBackdrop.tsx";
import { useAppDispatch } from "@redux/hooks.ts";

function DataRecoveryButtons() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const recoverData = () => {
    const obj = JSON.parse(text);
    const { schedules } = obj;
    dispatch(setSchedules(schedules));
    alert("복구가 완료됐습니다.");
    setOpen(false);
  };
  return (
    <>
      <Button variant="contained" color="success" onClick={() => setOpen(true)}>
        데이터 복구하기 (수동)
      </Button>
      <ModalStaticBackdrop
        keepMounted
        width="xl"
        open={open}
        component={
          <Box p={3}>
            <Typography variant="h5">
              복사하셨던 백업 데이터를 입력하세요
            </Typography>

            <Box my={3}>
              <Divider />
            </Box>

            <TextField fullWidth value={text} onChange={handleChange} />

            <Box my={3}>
              <Divider />
            </Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>민하님 03.01에 제공해주신 데이터</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {JSON.stringify({
                    schedules: [
                      {
                        event_name: "카드 대금 ",
                        alarm: false,
                        date: "2023-01-01",
                        start_time: "09:00",
                        end_time: "11:00",
                        repeating_cycle: "없음",
                        repeat_deadline: "없음",
                        repeat_endDate: "2023-01-01",
                        category: "카드이체료",
                        type: "-",
                        expected_spending: "600000",
                        payment_type: "상",
                        exclude: false,
                        id: "15d754bd-b169-46f9-82c8-be25c09b9c04",
                      },
                      {
                        event_name: "올리브영에서 틴트사기 ",
                        alarm: false,
                        date: "2023-01-05",
                        start_time: "09:00",
                        end_time: "11:00",
                        repeating_cycle: "없음",
                        repeat_deadline: "없음",
                        repeat_endDate: "2023-01-05",
                        category: "미용",
                        type: "-",
                        expected_spending: "15000",
                        payment_type: "중",
                        exclude: false,
                        id: "5b63fe2c-981b-452e-9b76-a4ae637d486d",
                      },
                      {
                        event_name: "호걸이랑 영화보기 ",
                        alarm: false,
                        date: "2023-01-12",
                        start_time: "09:00",
                        end_time: "11:00",
                        repeating_cycle: "없음",
                        repeat_deadline: "없음",
                        repeat_endDate: "2023-01-12",
                        category: "영화/전시",
                        type: "-",
                        expected_spending: "15000",
                        payment_type: "중",
                        exclude: false,
                        id: "c4e39156-a59c-45e4-91d2-d5a96e109ffd",
                      },
                      {
                        event_name: "미미랑 도너츠 먹으러가기 ",
                        alarm: false,
                        date: "2023-01-12",
                        start_time: "09:00",
                        end_time: "11:00",
                        repeating_cycle: "없음",
                        repeat_deadline: "없음",
                        repeat_endDate: "2023-01-12",
                        category: "카페",
                        type: "-",
                        expected_spending: "10000",
                        payment_type: "중",
                        exclude: false,
                        id: "0278d711-7fed-46ae-9421-839b80da9b5d",
                      },
                      {
                        event_name: "넷플릭스",
                        alarm: false,
                        date: "2023-03-01",
                        start_time: "09:00",
                        end_time: "20:00",
                        repeating_cycle: "월간",
                        repeat_deadline: "없음",
                        repeat_endDate: "2023-03-01",
                        category: "구독비",
                        type: "-",
                        expected_spending: "4250",
                        payment_type: "중",
                        exclude: false,
                        id: "d276d4b1-5cd2-4ca7-9354-43b5129bad9d",
                        user_id: "guest@finthepen.com",
                      },
                      {
                        event_name: "교통비/카카오뱅크",
                        alarm: false,
                        date: "2023-03-01",
                        start_time: "09:00",
                        end_time: "20:00",
                        repeating_cycle: "월간",
                        repeat_deadline: "없음",
                        repeat_endDate: "2023-03-01",
                        category: "대중교통",
                        type: "-",
                        expected_spending: 0,
                        payment_type: "중",
                        exclude: false,
                        id: "ccd950ba-b873-480f-982e-d4d7a60c4286",
                        user_id: "guest@finthepen.com",
                      },
                      {
                        event_name: "강남역 점심약속",
                        alarm: false,
                        date: "2023-03-04",
                        start_time: "13:00",
                        end_time: "15:00",
                        repeating_cycle: "없음",
                        repeat_deadline: "없음",
                        repeat_endDate: "2023-03-04",
                        category: "식비",
                        type: "-",
                        expected_spending: "200000",
                        payment_type: "상",
                        exclude: false,
                        id: "76f202f4-5c85-4ee0-924d-20d95b99c22d",
                        user_id: "guest@finthepen.com",
                      },
                      {
                        event_name: "파마 예약 ",
                        alarm: false,
                        date: "2023-01-04",
                        start_time: "15:00",
                        end_time: "17:00",
                        repeating_cycle: "없음",
                        repeat_deadline: "없음",
                        repeat_endDate: "2023-01-04",
                        category: "미용",
                        type: "-",
                        expected_spending: "100000",
                        payment_type: "중",
                        exclude: false,
                        id: "73129bbf-387d-495e-a4b0-d583a33b4c20",
                      },
                      {
                        event_name: "이사비",
                        alarm: false,
                        date: "2023-03-03",
                        start_time: "15:00",
                        end_time: "17:00",
                        repeating_cycle: "없음",
                        repeat_deadline: "없음",
                        repeat_endDate: "2023-03-03",
                        category: "주거",
                        type: "-",
                        expected_spending: "180000",
                        payment_type: "상",
                        exclude: false,
                        id: "4ddcd0ee-1e77-4fb9-945e-aa4ae55f04c6",
                        user_id: "guest@finthepen.com",
                      },
                      {
                        event_name: "길동이랑 저녁식사 ",
                        alarm: false,
                        date: "2023-01-02",
                        start_time: "18:00",
                        end_time: "19:00",
                        repeating_cycle: "없음",
                        repeat_deadline: "없음",
                        repeat_endDate: "2023-01-02",
                        category: "식비",
                        type: "-",
                        expected_spending: "15000",
                        payment_type: "중",
                        exclude: false,
                        id: "0063d15c-9dca-4357-8bf3-db3d0f1c65f4",
                      },
                      {
                        event_name: "86ALX",
                        alarm: false,
                        date: "2023-06-18",
                        start_time: "01:00",
                        end_time: "20:00",
                        repeating_cycle: "없음",
                        repeat_deadline: "없음",
                        repeat_endDate: "2023-06-18",
                        category: "급여",
                        type: "+",
                        expected_spending: 44300,
                        payment_type: "중",
                        exclude: true,
                        id: "c55825e2-f78b-4110-8a4b-618f9b6c30e6",
                        user_id: "guest@finthepen.com",
                      },
                      {
                        event_name: "EAVE2",
                        alarm: false,
                        date: "2023-06-18",
                        start_time: "03:00",
                        end_time: "21:00",
                        repeating_cycle: "없음",
                        repeat_deadline: "없음",
                        repeat_endDate: "2023-06-18",
                        category: "핸드폰요금",
                        type: "+",
                        expected_spending: 95900,
                        payment_type: "중",
                        exclude: false,
                        id: "6b538c2a-2873-4d51-a60b-a479a227e025",
                        user_id: "guest@finthepen.com",
                      },
                      {
                        event_name: "LLHDQ",
                        alarm: true,
                        date: "2023-06-18",
                        start_time: "05:00",
                        end_time: "22:00",
                        repeating_cycle: "없음",
                        repeat_deadline: "없음",
                        repeat_endDate: "2023-06-18",
                        category: "자녀/육아",
                        type: "+",
                        expected_spending: 70500,
                        payment_type: "하",
                        exclude: true,
                        id: "e3355344-fe39-427e-b937-eba566974bd2",
                        user_id: "guest@finthepen.com",
                      },
                      {
                        event_name: "R23A8",
                        alarm: false,
                        date: "2023-06-18",
                        start_time: "06:00",
                        end_time: "20:00",
                        repeating_cycle: "없음",
                        repeat_deadline: "없음",
                        repeat_endDate: "2023-06-18",
                        category: "통신",
                        type: "-",
                        expected_spending: 22700,
                        payment_type: "중",
                        exclude: true,
                        id: "4e69705c-ee92-4c3e-bf5d-5595a3615972",
                        user_id: "guest@finthepen.com",
                      },
                      {
                        event_name: "TR92A",
                        alarm: true,
                        date: "2023-06-18",
                        start_time: "08:00",
                        end_time: "23:00",
                        repeating_cycle: "없음",
                        repeat_deadline: "없음",
                        repeat_endDate: "2023-06-18",
                        category: "교육/학습",
                        type: "-",
                        expected_spending: 48700,
                        payment_type: "하",
                        exclude: false,
                        id: "7a5fcf37-08de-49fc-a015-e90605f2b593",
                        user_id: "guest@finthepen.com",
                      },
                      {
                        event_name: "5PDU3",
                        alarm: false,
                        date: "2023-06-18",
                        start_time: "09:00",
                        end_time: "20:00",
                        repeating_cycle: "없음",
                        repeat_deadline: "없음",
                        repeat_endDate: "2023-06-18",
                        category: "(주거)관리비/월세",
                        type: "+",
                        expected_spending: 75000,
                        payment_type: "중",
                        exclude: false,
                        id: "619e18a4-736e-44ec-b701-9d4090b3e7de",
                        user_id: "guest@finthepen.com",
                      },
                    ],
                    settings: {
                      앱비밀번호: false,
                      인증단계: 1,
                      화면테마: "default",
                      예산숨김: false,
                      반복일정목록: [],
                      숨김일정: false,
                      숨김일정목록: false,
                      비밀번호인증단계: 1,
                      기본알림: false,
                      진동: false,
                      소리: false,
                      알림음: "",
                      잠금화면알람: false,
                      일정알림시간: "5분전",
                      소비주의알림: false,
                      정기입출금목록: [],
                      마이데이터: [],
                      캘린더목록: [],
                    },
                  })}
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Box my={3}>
              <Divider />
            </Box>

            <Stack direction="row" spacing={1}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => setOpen(false)}
                color="error"
              >
                닫기
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => recoverData()}
                color="success"
              >
                복구하기
              </Button>
            </Stack>
          </Box>
        }
      />
    </>
  );
}

export default DataRecoveryButtons;
