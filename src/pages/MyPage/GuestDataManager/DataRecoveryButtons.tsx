import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModalStaticBackdrop from "@components/layouts/ModalStaticBackdrop.tsx";
import { setLocalStorage } from "@utils/storage.ts";
import { LOCAL_STORAGE_KEY_SCHEDULES } from "@api/keys.ts";
import { RequestSchedule } from "@app/types/schedule.ts";

function DataRecoveryButtons() {
  const [open, setOpen] = useState(false);
  const newSchedules: RequestSchedule[] = [];

  const recoverData = () => {
    setLocalStorage(LOCAL_STORAGE_KEY_SCHEDULES, newSchedules);
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
              복구하기를 누르면 데이터를 자동 저장해드립니다.
            </Typography>

            <Box my={3}>
              <Divider />
            </Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>데이터 제공을 기다리고 있습니다.</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {JSON.stringify({
                    schedules: newSchedules,
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
