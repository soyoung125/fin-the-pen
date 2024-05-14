import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import { Button, Stack } from "@mui/material";
import ReportMonthTitle from "@pages/reports/ReportMonthDetails/components/ReportMonthTitle";
import useReport from "@hooks/report/useReport.ts";
import useHeader from "@hooks/useHeader.ts";
import { useNavigate } from "react-router-dom";
import ReportList from "@pages/reports/ReportMonthDetails/components/ReportList";
import { useScheduleDrawer } from "@hooks/useScheduleDrawer.tsx";
import { INIT_SCHEDULE } from "@constants/schedule.ts";
import moment from "moment";
import { PATH } from "@constants/path.ts";
import useBottomBar from "@hooks/useBottomBar.ts";

function ReportMonthDetails() {
  useHeader(false);
  useBottomBar(false);
  const navigate = useNavigate();
  const {
    yearMonth,
    year,
    month,
    pickMonth,
    isPending,
    report,
    reportList,
    maxPercent,
  } = useReport();
  const { openScheduleDrawer } = useScheduleDrawer();

  const handleClickAddSchedule = () => {
    const date = moment(yearMonth, "YYYY-MM");
    openScheduleDrawer(INIT_SCHEDULE(date.format("YYYY-MM-DD")));
  };

  return (
    <>
      <TopNavigationBar
        onClick={() => navigate(-1)}
        title="카테고리 소비 리포트"
      />
      <Stack px="20px" py="24px" gap="24px">
        <ReportMonthTitle
          year={year}
          month={month}
          onClickMonth={pickMonth}
          goal={Number(report?.spend_amount)}
          spent={Number(report?.first_month_amount)}
        />

        <ReportList
          isPending={isPending}
          reportList={reportList}
          maxPercent={maxPercent}
          handleClickAddSchedule={handleClickAddSchedule}
        />
        <Button onClick={() => navigate(`${PATH.reportCategoryDetail}/외식`)}>
          test
        </Button>
      </Stack>
    </>
  );
}

export default ReportMonthDetails;
