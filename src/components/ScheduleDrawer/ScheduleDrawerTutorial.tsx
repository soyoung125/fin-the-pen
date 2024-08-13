import { ITutorial } from "@components/Tutorial/Tutorial.tsx";
import { Box, Button, Divider, Portal, Stack } from "@mui/material";
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
}: {
  closeTutorial: () => void;
}) {
  const allDayRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
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
        setValue((prev) => prev + 1);
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
          />
        </>
      ),
      nextAction: () => {
        setValue((prev) => prev + 1);
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
              message={"일정의 기간을 정하여,\n구체적인 지출 계획을 세워보세요"}
            />
          </Box>
        </>
      ),
      nextAction: () => {
        setValue((prev) => prev + 1);
      },
    },
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
            top={220}
          >
            <HighLightDescription
              offset={54}
              position={"bottom"}
              message={
                "정기 템플릿을 선택하여,\n저장된  일정에 정보를 추가할 수 있어요."
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
  const { scheduleForm, getRepeat } = useScheduleForm();

  useEffect(() => {
    if (value === 2) {
      allDayRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [value]);

  return (
    <Box>
      {value === 1 && (
        <CategoryPicker
          closeCategoryPicker={() => {
            console.log("click");
          }}
        />
      )}

      {value !== 1 && (
        <>
          <ScheduleDrawerHeader
            value={value}
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

              <SelectTemplateTutorial selected={value === 3 ? 0 : -1} />
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

      <Portal>
        <Tutorial tutorials={tutorials} />
      </Portal>
    </Box>
  );
}

export default ScheduleDrawerTutorial;
