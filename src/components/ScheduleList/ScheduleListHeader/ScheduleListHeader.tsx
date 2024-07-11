import { Stack, Typography } from "@mui/material";
import SelectMenus from "@components/common/SelectMenus";
import * as React from "react";

export interface ReportListHeaderProps {
  count: number;
  options: string[];
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

function ScheduleListHeader({
  count,
  options,
  selectedOption,
  setSelectedOption,
}: ReportListHeaderProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      px={2.5}
      sx={{ height: "38px" }}
    >
      <Typography fontSize="13px">
        총&nbsp;<span style={{ color: "#735BF2" }}>{count}</span>건
      </Typography>
      <SelectMenus
        options={options}
        selectedOption={selectedOption}
        setSelectedOption={(v) => setSelectedOption(v)}
      />
    </Stack>
  );
}

export default ScheduleListHeader;
