import { Box } from "@mui/material";

interface CalendarBoxProps {
  dateHeight: number;
  dateSize: number;
  children: JSX.Element;
  week: number;
}

function CalenderBox({
  dateHeight,
  dateSize,
  children,
  week,
}: CalendarBoxProps) {
  const DATE_HEIGHT = dateHeight;
  const DATE_SIZE = dateSize;

  return (
    <Box
      sx={{
        ".MuiDateCalendar-root": {
          minWidth: "100%",
          minHeight: `calc(30px + 40px + ${DATE_HEIGHT * week}px)`,
        },
        ".MuiPickersCalendarHeader-root": {
          maxHeight: "40px",
          minHeight: "40px",
          height: "40px",
          margin: "0",
          display: "flex",
          paddingX: 0.5,
        },
        ".MuiPickersArrowSwitcher-root": {
          height: "40px",
          width: "100vw",
          display: "inline-flex",
          justifyContent: "space-between",
        },
        ".MuiPickersCalendarHeader-labelContainer": {
          height: "40px",
          position: "absolute",
          left: 0,
          right: 0,
          margin: 0,
          alignItems: "center",
          justifyContent: "center",
        },
        ".MuiPickersCalendarHeader-switchViewButton": {
          display: "none",
          margin: 0,
        },

        // 데이 디자인을 위한 css
        "& .MuiTypography-caption": {
          width: "100%",
          margin: 0,
        },
        ".MuiPickersSlideTransition-root": {
          minHeight: DATE_HEIGHT * week,
        },
        '.MuiDayCalendar-monthContainer [role="row"]': {
          margin: 0,
        },
        // "& .MuiPickersDay-dayWithMargin": {
        //   margin: 0,
        // },
        "& .MuiDayCalendar-weekContainer": {
          height: DATE_HEIGHT,
        },
        "& .MuiPickersDay-root": {
          width: DATE_SIZE,
          height: DATE_SIZE,
          marginX: "auto",
        },
        ".Mui-selected": {
          borderRadius: 2,
          backgroundColor: "primary.main",
          color: "white",
          fontWeight: "bold",
        },
      }}
    >
      {children}
    </Box>
  );
}

export default CalenderBox;
