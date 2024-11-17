import useHeader from "@hooks/useHeader.ts";
import ScheduleListPageHeader from "components/ScheduleList/ScheduleListPageHeader";
import useCategoryReport from "@hooks/report/useCategoryReport.ts";
import useBottomBar from "@hooks/useBottomBar.ts";
import ReportCategoryBody from "@pages/reports/ReportCategoryDetails/components/ReportCategoryBody";
import useAsset from "@hooks/assetManagement/useAsset.ts";
import useMonth from "@hooks/report/useMonth.ts";

function ReportCategoryDetails() {
  useHeader(false);
  useBottomBar(false);

  const { date, year, month, pickMonth, subtractMonth, addMonth } = useMonth();
  const { report, isPending } = useCategoryReport(date);
  const { setMenu } = useAsset();

  const handleClickSetSpendGoal = () => {
    setMenu(2, false);
  };

  return (
    <>
      <ScheduleListPageHeader
        date={`${year}년 ${month}월`}
        addMonth={addMonth}
        subtractMonth={subtractMonth}
        changeMonth={pickMonth}
        handleClickSearch={() => alert("search")}
        handleClickFilter={() => alert("filter")}
      />

      <ReportCategoryBody
        report={report}
        isPending={isPending}
        handleClickAddSchedule={handleClickSetSpendGoal}
      />
    </>
  );
}

export default ReportCategoryDetails;
