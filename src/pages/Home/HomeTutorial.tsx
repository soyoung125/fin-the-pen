import { useState } from "react";
import { Box, Drawer, Portal } from "@mui/material";
import SelectYearMonth from "@components/common/SelectYearMonth";
import moment from "moment";
import MenuTab from "@pages/Home/next-components/HomeHeader/MenuTab";
import "swiper/css";
import MonthTutorialPage from "@pages/Home/pages/MonthSchedulePage/MonthTutorialPage.tsx";
import { ITutorial } from "@components/Tutorial/Tutorial.tsx";
import Tutorial from "@components/Tutorial";
import WeekTutorialPage from "@pages/Home/pages/WeekSchedulePage/WeekTutorialPage.tsx";
import HighLightDescription from "@components/Tutorial/components/HighlightDescription";

function HomeTutorial({ closeTutorial }: { closeTutorial: () => void }) {
  const labels = ["월 별", "주 별", "일 별"];
  const [value, setValue] = useState(0);
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
            top={"65px"}
            left={"calc(100dvw / 6 - 28px)"}
          />

          <Box
            sx={{ backgroundColor: "rgb(128, 128, 128)" }}
            width="100dvw"
            height={243}
            display="flex"
            position="absolute"
            bottom={138}
          >
            <HighLightDescription
              offset={243}
              position={"top"}
              message={
                "등록된 일정의 정보 확인이 가능합니다.\n오늘 이후의 일정 등록 시에는 금액 정보가 \n다음과 같이 표시돼요!"
              }
            />
          </Box>
        </>
      ),
      nextAction: () => {
        setValue(1);
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
            top={"65px"}
            left={"calc(100dvw / 2 - 42px)"}
          />
          <Box
            sx={{ backgroundColor: "rgb(128, 128, 128)" }}
            width={"100dvw"}
            height={184}
            display="flex"
            position="absolute"
            top={160}
          >
            <HighLightDescription
              offset={184}
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

  document.body.style.overflow = "hidden";

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
        <MenuTab labels={labels} value={value} />
      </Box>

      <Box overflow="hidden">
        {value === 0 && <MonthTutorialPage />}
        {value === 1 && <WeekTutorialPage />}
      </Box>

      <Portal>
        <Tutorial tutorials={tutorials} />
      </Portal>
    </Drawer>
  );
}

export default HomeTutorial;
