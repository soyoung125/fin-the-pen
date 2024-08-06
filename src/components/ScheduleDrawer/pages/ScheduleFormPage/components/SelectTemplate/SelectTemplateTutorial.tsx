import { Box, Stack, Typography } from "@mui/material";
import { SCHEDULE_DRAWER } from "@constants/schedule.ts";
import {
  TemplateBadge,
  TemplateBadgeText,
  TemplateListContainer,
} from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/SelectTemplate/components/TemplateList/TemplateList.styles.ts";
import TemplateIconSVG from "@components/common/TemplateIconSVG";

function SelectTemplateTutorial({ selected }: { selected: number }) {
  const templates = [
    {
      id: 0,
      template_name: "아름다운 클리닉",
      category_name: "뷰티/미용",
      statement: "",
      user_id: "user",
      amount: "1000",
    },
    {
      id: 1,
      template_name: "SKT 통신사 요금",
      category_name: "주거/통신",
      statement: "",
      user_id: "user",
      amount: "1000",
    },
    {
      id: 2,
      template_name: "삼성 티비 할부",
      category_name: "온라인결제",
      statement: "",
      user_id: "user",
      amount: "1000",
    },
  ];

  return (
    <Box px={2.5}>
      <Stack py={1} spacing={1.5} sx={{ borderBottom: "1px solid #F7F7F8" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h2" color="#131416">
            {SCHEDULE_DRAWER.template}
          </Typography>
          <Typography fontSize="12px" fontWeight={600} color="#0075FF">
            {SCHEDULE_DRAWER.showAllTemplate}
          </Typography>
        </Stack>

        <TemplateListContainer>
          {templates.map((t) => (
            <TemplateBadge key={t.id} $selected={t.id === selected}>
              <TemplateIconSVG id={t.category_name} />

              <TemplateBadgeText>{t.template_name}</TemplateBadgeText>
            </TemplateBadge>
          ))}
        </TemplateListContainer>
      </Stack>
    </Box>
  );
}

export default SelectTemplateTutorial;
