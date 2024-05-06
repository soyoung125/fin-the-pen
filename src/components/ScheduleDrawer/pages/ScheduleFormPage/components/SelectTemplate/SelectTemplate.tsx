import { Box, Stack, Typography } from "@mui/material";
import { SCHEDULE_DRAWER } from "@constants/schedule.ts";
import { useState } from "react";
import { TemplateBadge } from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/SelectTemplate/SelecteTemplate.styles.ts";

function SelectTemplate() {
  const [selected, setSelected] = useState(0);
  const templates = [
    {
      id: 1,
      name: "이전 템플릿",
    },
    {
      id: 2,
      name: "이전 템플릿",
    },
    {
      id: 3,
      name: "이전 템플릿",
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
          <Typography fontSize="12px" fontWeight={600} color="#8C919C">
            {SCHEDULE_DRAWER.showAllTemplate}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          {templates.map((t) => (
            <TemplateBadge
              key={t.id}
              $selected={selected === t.id}
              onClick={() => setSelected(t.id)}
            >
              {t.name}
            </TemplateBadge>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

export default SelectTemplate;
