import useSpendingGoal from "@hooks/assetManagement/useSpendingGoal.ts";
import { Box, Stack } from "@mui/material";
import MonthSpendingGoal from "@pages/AssetManagement/pages/SpendingGoal/components/MonthSpendingGoal";
import { useModal } from "@hooks/modal/useModal.tsx";
import ModifyModal from "pages/AssetManagement/pages/SpendingGoal/components/MonthSpendingGoal/components/ModifyModal";
import moment from "moment";
import { getAmount } from "@pages/AssetManagement/utils.ts";
import RoundedPaper from "@components/common/RoundedPaper.tsx";
import MonthlyReport from "@pages/reports/Report/components/MonthlyReport";
import ReportLayout from "@pages/reports/Report/components/layout/ReportLayout";

function SpendingGoal() {
  const {
    offSpendAmount,
    monthlyReport,
    userName,
    yearMonth,
    month,
    pickMonth,
    handleSetSpendingGoal,
  } = useSpendingGoal();
  const { openModal, closeModal } = useModal();

  const defaultForm = {
    start_date: yearMonth,
    end_date: yearMonth,
    regular: "OFF" as const,
    is_batch: false,
  };

  const handleModify = () => {
    openModal({
      modalElement: (
        <ModifyModal
          closeModal={closeModal}
          value={getAmount(offSpendAmount.spend_goal_amount)}
          month={moment(yearMonth).format("M")}
          handleSubmit={(v: number) =>
            handleSetSpendingGoal({
              ...defaultForm,
              spend_goal_amount: v.toString(),
            })
          }
        />
      ),
      isBackdropClickable: false,
    });
  };

  return (
    <Stack spacing={4} px={2.5} pt={2.5}>
      <Box sx={{ fontSize: "20px", fontWeight: 500 }}>
        <span style={{ fontSize: "20px", color: "#735BF2", fontWeight: 500 }}>
          {userName}
        </span>
        {"님의 지출 목표"}
      </Box>

      <MonthSpendingGoal
        date={yearMonth}
        changeYearAndMonth={pickMonth}
        handleModify={handleModify}
        goal={offSpendAmount.spend_goal_amount}
        spent={offSpendAmount.spend_amount}
      />

      <RoundedPaper my={2}>
        <ReportLayout
          title="월별 소비 리포트"
          content={
            <MonthlyReport
              month={month}
              previousSpending={monthlyReport?.previous_amount ?? 0}
              spending={monthlyReport?.current_amount ?? 0}
              twoMonthsAgoSpending={monthlyReport?.second_amount ?? 0}
            />
          }
        />
      </RoundedPaper>
    </Stack>
  );
}

export default SpendingGoal;
