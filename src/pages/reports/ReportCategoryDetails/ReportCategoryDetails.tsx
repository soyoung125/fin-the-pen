import useHeader from "@hooks/useHeader.ts";
import ScheduleListPageHeader from "components/ScheduleList/ScheduleListPageHeader";
import useCategoryReport from "@hooks/report/useCategoryReport.ts";
import useBottomBar from "@hooks/useBottomBar.ts";
import ReportCategoryBody from "@pages/reports/ReportCategoryDetails/components/ReportCategoryBody";
import useAsset from "@hooks/assetManagement/useAsset.ts";

function ReportCategoryDetails() {
  useHeader(false);
  useBottomBar(false);
  const { report, isPending, year, month, addMonth, subtractMonth, pickMonth } =
    useCategoryReport();
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
