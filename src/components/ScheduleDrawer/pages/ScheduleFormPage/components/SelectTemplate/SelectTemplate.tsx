import { Box, Stack, Typography } from "@mui/material";
import { SCHEDULE_DRAWER } from "@constants/schedule.ts";
import { useTemplateDrawer } from "@hooks/useTemplateDrawer.tsx";
import TemplateList from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/SelectTemplate/components/TemplateList";
import useScheduleTemplate from "@hooks/schedule/useScheduleTemplate.ts";

function SelectTemplate() {
  const { openDrawer } = useTemplateDrawer();
  const { templates, selectedTemplate, setSelected } = useScheduleTemplate();

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
          <Typography
            fontSize="12px"
            fontWeight={600}
            color="#0075FF"
            onClick={() => openDrawer(setSelected)}
          >
            {SCHEDULE_DRAWER.showAllTemplate}
          </Typography>
        </Stack>

        <TemplateList
          templates={templates}
          selected={selectedTemplate}
          setSelected={setSelected}
        />
      </Stack>
    </Box>
  );
}

export default SelectTemplate;
