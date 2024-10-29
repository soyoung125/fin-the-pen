import { useState } from "react";
import { Box, Drawer } from "@mui/material";
import SelectYearMonth from "@components/common/SelectYearMonth";
import moment from "moment";
import MenuTab from "@pages/Home/next-components/HomeHeader/MenuTab";
import MonthTutorialPage from "@pages/Home/pages/MonthSchedulePage/MonthTutorialPage.tsx";
import { ITutorial } from "@components/Tutorial/Tutorial.tsx";
import Tutorial from "@components/Tutorial";
import WeekTutorialPage from "@pages/Home/pages/WeekSchedulePage/WeekTutorialPage.tsx";
import HighLightDescription from "@components/Tutorial/components/HighlightDescription";

function HomeTutorial({ closeTutorial }: { closeTutorial: () => void }) {
  const [step, setStep] = useState(0);

  const labels = ["월 별", "주 별", "일 별"];
  const isShortHeight = window.innerHeight < 700;
  const tutorials: ITutorial[] = [
    {
      tutorialPage: (
        <>
          <Box
            sx={{ backgroundColor: "rgb(128, 128, 128)" }}
            width={80}
            height={80}
            borderRadius={100}
            display="flex"
            position="absolute"
            top={-5}
            left={"calc(100% / 6 - 25px)"}
          />

          <Box
            sx={{ backgroundColor: "rgb(128, 128, 128)" }}
            width="100%"
            height={243}
            display="flex"
            position="absolute"
            bottom={85}
          >
            <HighLightDescription
              offset={243}
              position={"top"}
              message={
                "등록된 일정과 자산을 확인해요.\n계획된 자산 일정이 지나면 다음과 같이 표시돼요."
              }
            />
          </Box>
        </>
      ),
      nextAction: () => {
        setStep(1);
      },
    },
    {
      tutorialPage: (
        <>
          <Box
            sx={{ backgroundColor: "rgb(128, 128, 128)" }}
            width={80}
            height={80}
            borderRadius={100}
            display="flex"
            position="absolute"
            top={-5}
            left={"calc(100% / 2 - 40px)"}
          />
          <Box
            sx={{ backgroundColor: "rgb(128, 128, 128)" }}
            width={"100%"}
            height={isShortHeight ? 184 : 360}
            display="flex"
            position="absolute"
            top={85}
          >
            <HighLightDescription
              offset={isShortHeight ? 184 : 370}
              position={"bottom"}
              message={
                "이번주에는 얼마나 소비했는지,\n다음주에는 얼마나 소비할 예정인지\n미리 확인할 수 있어요!"
              }
            />
          </Box>
        </>
      ),
      nextAction: () => {
        closeTutorial();
      },
    },
  ];

  return (
    <Drawer
      open={true}
      anchor="bottom"
      onClose={closeTutorial}
      variant="persistent"
      sx={{
        height: "calc(100dvh - 122px)",
        ".MuiPaper-root.MuiDrawer-paper": {
          maxHeight: "calc(100dvh - 122px)",
          height: "calc(100dvh - 122px)",
          bottom: "82px",
          border: 0,
        },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "#FFF",
        }}
      >
        <Box py={1} px={2.5}>
          <SelectYearMonth date={moment().format("YYYY년 M월")} />
        </Box>
        <MenuTab labels={labels} value={step} />
      </Box>

      <Box overflow="hidden">
        {step === 0 && <MonthTutorialPage />}
        {step === 1 && <WeekTutorialPage />}
      </Box>

      <Tutorial tutorials={tutorials} step={step} handleClose={closeTutorial} />
    </Drawer>
  );
}

export default HomeTutorial;
