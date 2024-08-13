import { Box, Drawer, Portal, Stack, Typography } from "@mui/material";
import PredictBox from "@pages/reports/Report/components/PredictBox";
import asset_icon from "@assets/icons/asset.svg";
import setting_icon from "@assets/icons/setting.svg";
import money_icon from "@assets/icons/money.svg";
import info_icon from "@assets/icons/information.svg";
import ReportBox from "@pages/reports/Report/components/layout/ReportBox";
import ReportLayout from "@pages/reports/Report/components/layout/ReportLayout";
import { PATH } from "@constants/path.ts";
import PredictReport from "@pages/reports/Report/components/PredictReport";
import FixedTransaction from "@pages/reports/Report/components/FixedTransaction";
import moment from "moment/moment";
import MonthlyReport from "@pages/reports/Report/components/MonthlyReport";
import TutorialBubbleChart from "@pages/reports/Report/components/BubbleChart/TutorialBubbleChart.tsx";
import Tutorial from "@components/Tutorial";
import { ITutorial } from "@components/Tutorial/Tutorial.tsx";
import HighLightDescription from "@components/Tutorial/components/HighlightDescription";
import { useEffect, useRef, useState } from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

function ReportTutorial({ closeTutorial }: { closeTutorial: () => void }) {
  const year = moment().year();
  const month = moment().month() + 1;
  const [value, setValue] = useState(0);
  const monthRef = useRef<HTMLDivElement>(null);
  const predictRef = useRef<HTMLDivElement>(null);
  const fixedRef = useRef<HTMLDivElement>(null);
  const isShortHeight = window.innerHeight < 700;
  const MONTH_REPORT_HEIGHT = isShortHeight
    ? window.innerWidth / 1.5
    : window.innerWidth / 1.4;

  const tutorials: ITutorial[] = [
    {
      tutorialPage: (
        <>
          <Box
            display="flex"
            width={"100dvw"}
            height={127}
            position="absolute"
            top={isShortHeight ? 91 : 143}
          >
            <Stack direction={"row"} spacing={"10px"} width={"100dvw"} px={2.5}>
              <Box
                sx={{ backgroundColor: "rgb(128, 128, 128)" }}
                width="100%"
                borderRadius={2}
              />
              <Box
                sx={{ backgroundColor: "rgb(128, 128, 128)" }}
                width="100%"
                borderRadius={2}
              />
            </Stack>
            <HighLightDescription
              offset={127}
              position={"top"}
              message={"설정하신 목표 금액과\n사용 금액을 가장 먼저 확인해요"}
            />
          </Box>

          <Box
            display="flex"
            width={"100dvw"}
            height={MONTH_REPORT_HEIGHT}
            position="absolute"
            top={isShortHeight ? 340 : 392}
          >
            <Box
              sx={{ backgroundColor: "rgb(128, 128, 128)" }}
              mx={"18px"}
              width={"100%"}
            />
            <HighLightDescription
              offset={MONTH_REPORT_HEIGHT + 10}
              position={"top"}
              message={"카테고리 별 소비 금액을\n도표를 통해 확인할 수 있어요"}
            />
          </Box>
        </>
      ),
      nextAction: () => {
        predictRef.current?.scrollIntoView({ behavior: "smooth" });
        setValue((prev) => prev + 1);
      },
    },
    {
      tutorialPage: (
        <>
          <Box
            sx={{ backgroundColor: "rgb(128, 128, 128)" }}
            width={"calc(100dvw - 152px)"}
            height={"calc(100dvw - 152px)"}
            borderRadius={"999px"}
            display="flex"
            position="absolute"
            top={129}
            left={"76px"}
          />
          <Box
            width={"100dvw"}
            height={150}
            top={"100dvw"}
            display="flex"
            position="absolute"
          >
            <Box
              mx={2.5}
              width="100%"
              borderRadius={2}
              sx={{ backgroundColor: "rgb(128, 128, 128)" }}
            />
            <HighLightDescription
              offset={160}
              position={"bottom"}
              message={"소비 예측 리포트에 대한\n지표를 확인할 수 있어요"}
            />
          </Box>
        </>
      ),
      nextAction: () => {
        fixedRef.current?.scrollIntoView({ behavior: "smooth" });
        setValue((prev) => prev + 1);
      },
    },
    {
      tutorialPage: (
        <>
          <Box
            width={"100dvw"}
            height={220}
            display="flex"
            position="absolute"
            bottom={370}
          >
            <Stack width={"100dvw"} spacing="14px" px="36px">
              <Box
                sx={{ backgroundColor: "rgb(128, 128, 128)" }}
                width="100%"
                height={81}
                borderRadius={2}
              />
              <Box
                sx={{ backgroundColor: "rgb(128, 128, 128)" }}
                width="100%"
                height={81}
                borderRadius={2}
              />
            </Stack>
            <HighLightDescription
              offset={220}
              position={"top"}
              message={"일정의 기간을 정하여,\n구체적인 지출 계획을 세워보세요"}
            />
          </Box>

          <Box height={160} display="flex" position="absolute" bottom={120}>
            <Box
              sx={{ backgroundColor: "rgb(128, 128, 128)" }}
              mx="35px"
              borderRadius="6px"
              width={"calc(100dvw - 70px)"}
            ></Box>
            <HighLightDescription
              offset={170}
              position={"top"}
              message={
                "월별 소비에 대한 변화도\n그래프를 통하여 한 눈에 확인할 수 있어요"
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

  useEffect(() => {
    if (isShortHeight) {
      monthRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [monthRef]);

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
      <Stack bgcolor="#F7F7F8" px="20px" py="24px" gap="24px">
        <Stack spacing={0.5}>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography fontSize="16px" alignItems={"center"}>
              {year}년 {month}월
            </Typography>
            <ArrowForwardIosRoundedIcon fontSize={"small"} color="secondary" />
          </Stack>
          <Typography fontSize="18px" ref={monthRef}>
            오늘까지 총{" "}
            <span style={{ color: "#735BF2", fontWeight: 700 }}>2,000,000</span>
            원 소비했어요
          </Typography>
        </Stack>
        <Stack direction="row" gap="10px">
          <PredictBox
            title="이번 달 목표 지출"
            titleIcon={
              <img src={asset_icon} alt="asset" width="28px" height="28px" />
            }
            amount={600000}
            navigateIcon={<img src={setting_icon} alt="setting" />}
          />
          <PredictBox
            title="사용 가능 금액"
            titleIcon={
              <img src={money_icon} alt="info" width="28px" height="28px" />
            }
            amount={260000}
            navigateIcon={<img src={info_icon} alt="info" />}
          />
        </Stack>

        <ReportBox
          content={
            <ReportLayout
              title="월간 소비 리포트"
              navigateTo={PATH.reportMonthDetail}
              content={<TutorialBubbleChart />}
            />
          }
        />

        <ReportBox
          content={
            <Stack spacing={5}>
              <div ref={predictRef}>
                <ReportLayout
                  title="소비 예측 리포트"
                  content={
                    <PredictReport
                      selected={"used"}
                      month={month}
                      goal={600000}
                      predict={95000}
                      used={245000}
                      useable={260000}
                    />
                  }
                />
              </div>

              <ReportLayout
                title={`${month}월 고정 입출금`}
                content={
                  <Stack spacing={1.5} pt={3}>
                    <FixedTransaction
                      title={"고정 수입"}
                      amount={3400000}
                      month={(month - 1).toString()}
                      difference={200000}
                    />
                    <FixedTransaction
                      title={"고정 지출"}
                      amount={479000}
                      month={(month - 1).toString()}
                      difference={200000}
                    />
                  </Stack>
                }
              />

              <div ref={fixedRef}>
                <ReportLayout
                  title="월별 소비 리포트"
                  content={
                    <MonthlyReport
                      month={month}
                      previousSpending={380000}
                      spending={245000}
                      twoMonthsAgoSpending={720000}
                    />
                  }
                />
              </div>
            </Stack>
          }
        />
      </Stack>
      <Portal>
        <Tutorial tutorials={tutorials} />
      </Portal>
    </Drawer>
  );
}

export default ReportTutorial;
