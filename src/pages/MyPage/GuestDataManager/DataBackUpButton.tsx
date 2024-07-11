import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import ModalStaticBackdrop from "@components/layouts/ModalStaticBackdrop.tsx";
import { selectSettings } from "@redux/slices/settingSlice.ts";
import useSchedule from "@hooks/schedule/useSchedule.ts";

function DataBackUpButton() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const { schedules } = useSchedule();
  const settings = useSelector(selectSettings);

  const saveData = () => {
    setOpen(true);
    setText(
      JSON.stringify({
        schedules,
        settings,
      })
    );
  };

  return (
    <>
      <Button variant="contained" color="info" onClick={() => saveData()}>
        지금까지 작업한 데이터 백업하기 (수동)
      </Button>
      <ModalStaticBackdrop
        keepMounted
        width="xl"
        open={open}
        component={
          <Box p={3}>
            <Typography variant="h5">
              아래 텍스트를 복사하여 다른 곳에 저장해주세요.
            </Typography>

            <Box my={3}>
              <Divider />
            </Box>

            <textarea
              value={text}
              style={{
                width: "100%",
                height: "6.25em",
                border: "none",
                resize: "none",
              }}
              readOnly
            />

            <Box my={3}>
              <Divider />
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={() => setOpen(false)}
            >
              닫기
            </Button>
          </Box>
        }
      />
    </>
  );
}

export default DataBackUpButton;
