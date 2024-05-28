import { Typography, Stack, Box } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import SelectYearMonth from "@components/common/SelectYearMonth";
import { HeaderBox } from "./ScheduleListPageHeader.styles.ts";
import IconSVG from "@components/common/IconSVG";
import React from "react";

export interface ScheduleListPageHeaderProps {
  date: string;
  title?: string;
  addMonth: () => void;
  subtractMonth: () => void;
  changeMonth: () => void;
  handleClickSearch: () => void;
  handleClickFilter: () => void;
}

function ScheduleListPageHeader({
  date,
  title,
  changeMonth,
  subtractMonth,
  addMonth,
  handleClickSearch,
  handleClickFilter,
}: ScheduleListPageHeaderProps) {
  const navigate = useNavigate();
  return (
    <Box bgcolor="#735bf2" sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
      <HeaderBox>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <ClearRoundedIcon onClick={() => navigate(-1)} />
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <SearchIcon onClick={handleClickSearch} />
        </Stack>
      </HeaderBox>

      <HeaderBox>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ color: "#FFF" }}
        >
          <SelectYearMonth
            date={date}
            lastMonth={subtractMonth}
            nextMonth={addMonth}
            changeYearAndMonth={changeMonth}
          />
          <Box onClick={handleClickFilter} height="24px">
            <IconSVG id={"filter-white"} size={24} />
          </Box>
        </Stack>
      </HeaderBox>
    </Box>
  );
}

export default ScheduleListPageHeader;
