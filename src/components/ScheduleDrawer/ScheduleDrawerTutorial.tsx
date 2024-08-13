import { ITutorial } from "@components/Tutorial/Tutorial.tsx";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import HighLightDescription from "@components/Tutorial/components/HighlightDescription";
import { useEffect, useRef, useState } from "react";
import CategoryPicker from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/CategoryPicker";
import ScheduleDrawerHeader from "@components/ScheduleDrawer/layouts/ScheduleDrawerHeader/ScheduleDrawerHeader.tsx";
import RepeatInput from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/RepeatInput.tsx";
import ThickDivider from "@components/common/ThickDivider.tsx";
import DateInput from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/DateInput";
import CategoryInput from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/CategoryInput.tsx";
import NameInput from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/NameInput.tsx";
import { useScheduleForm } from "@components/ScheduleDrawer/hooks/useScheduleForm.ts";
import SelectTemplateTutorial from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/SelectTemplate/SelectTemplateTutorial.tsx";
import {
  ActionContainer,
  AutoSaveContainer,
  FooterContainer,
} from "@components/ScheduleDrawer/layouts/ScheduleDrawerFooter/ScheduleDrawerFooter.style.ts";
import Save from "@assets/icons/save_icon.svg";
import { SCHEDULE_DRAWER } from "@constants/schedule.ts";
import Tutorial from "@components/Tutorial";

function ScheduleDrawerTutorial({
  closeTutorial,
  isTemplate,
}: {
  closeTutorial: () => void;
  isTemplate?: boolean;
}) {
  const [step, setStep] = useState(0);

  const allDayRef = useRef<HTMLDivElement>(null);
  const { scheduleForm, getRepeat } = useScheduleForm();

  const isShortHeight = window.innerHeight < 700;
  const tutorials: ITutorial[] = [
    {
      tutorialPage: (
        <>
          <Box
            sx={{ backgroundColor: "rgb(128, 128, 128)" }}
            width="100dvw"
            height={104}
            display="flex"
            position="absolute"
            top={112}
          >
            <HighLightDescription
              offset={104}
              position={"bottom"}
              message={
                "등록하실 일정의 이름을 등록한뒤\n해당 일정의 카테고리를 설정해주세요."
              }
            />
          </Box>
        </>
      ),
      nextAction: () => {
        setStep((prev) => prev + 1);
      },
    },
    {
      tutorialPage: (
        <>
          <Box
            sx={{ backgroundColor: "rgb(128, 128, 128)" }}
            width={"calc(100dvw - 28px)"}
            mx={"14px"}
            borderRadius={"12px"}
            height={38}
            display="flex"
            position="absolute"
            top={100}
          >
            <HighLightDescription
              offset={38}
              position={"top"}
              isCentered
              message={"지출과 수입을 바탕으로 선택해주세요"}
            />
          </Box>
          <Box
            sx={{ backgroundColor: "rgb(255, 255, 255, 0.05)" }}
            width={"calc(100dvw - 28px)"}
            height={350}
            mx={"14px"}
            borderRadius={1.5}
            top={150}
            display="flex"
            position="absolute"
            border="2px dashed"
            borderColor="#F8F6FF"
          >
            <Typography
              variant="h2"
              color="#FFF"
              sx={{
                alignSelf: "center",
                mx: "auto",
                whiteSpace: "pre-line",
                textAlign: "center",
              }}
            >
              {"일정에 해당되는\n카테고리를 선택해주세요."}
            </Typography>
          </Box>
        </>
      ),
      nextAction: () => {
        setStep((prev) => prev + 1);
      },
    },
    {
      tutorialPage: (
        <>
          <Box
            sx={{ backgroundColor: "rgb(128, 128, 128)" }}
            width={"100dvw"}
            height={220}
            display="flex"
            position="absolute"
            bottom={isShortHeight ? 100 : undefined}
            top={isShortHeight ? undefined : 385}
          >
            <HighLightDescription
              offset={220}
              position={"top"}
              message={"주기적으로 반복되는\n지출과 수입 일정을 등록하세요. "}
            />
          </Box>
        </>
      ),
      nextAction: () => {
        closeTutorial();
      },
    },
  ];
  const templateTutorials: ITutorial[] = [
    {
      tutorialPage: (
        <>
          <Box
            sx={{ backgroundColor: "rgb(128, 128, 128)" }}
            width={"calc(100dvw - 22px)"}
            mx={"11px"}
            borderRadius={"12px"}
            height={45}
            display="flex"
            position="absolute"
            top={260}
          >
            <HighLightDescription
              offset={54}
              position={"bottom"}
              message={
                "정기 템플릿을 이용하여\n자산 내역을 한번에 확인할 수 있어요."
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
    if (step === 2) {
      allDayRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [step]);

  return (
    <Box>
      {step === 1 && (
        <CategoryPicker
          closeCategoryPicker={() => {
            console.log("click");
          }}
        />
      )}

      {step !== 1 && (
        <>
          <ScheduleDrawerHeader
            value={step}
            handleReset={() => console.log()}
          />

          <Stack spacing={2} pt={2}>
            <Stack spacing="10px">
              {/* 이벤트 제목 */}
              <NameInput showError={false} />

              {/* 이벤트 카테고리 */}
              <CategoryInput
                selectedCategory={scheduleForm.category}
                showError={false}
              />

              <SelectTemplateTutorial selected={isTemplate ? 0 : -1} />
            </Stack>

            {/* 이벤트 반복 설정 */}
            <RepeatInput
              repeatType={scheduleForm.repeat.kind_type}
              repeatTitle={getRepeat()}
            />

            <ThickDivider />

            {/* 이벤트 일정 */}
            <DateInput showError={false} />
          </Stack>
          <Box ref={allDayRef} height={107} />

          {/* 제출 버튼 */}
          <FooterContainer>
            <AutoSaveContainer>
              <img src={Save} alt="save" />
              입력 정보는 자동으로 저장됩니다.
            </AutoSaveContainer>

            <ActionContainer>
              <Divider />

              <Box sx={{ mx: 2.5, mt: 1 }}>
                <Button fullWidth variant="contained" color="secondary">
                  {SCHEDULE_DRAWER.add_schedule}
                </Button>
              </Box>
            </ActionContainer>
          </FooterContainer>
        </>
      )}

      <Tutorial
        tutorials={isTemplate ? templateTutorials : tutorials}
        step={step}
        handleClose={closeTutorial}
      />
    </Box>
  );
}

export default ScheduleDrawerTutorial;
