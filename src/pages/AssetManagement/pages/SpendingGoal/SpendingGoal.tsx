import useSpendingGoal from "@hooks/assetManagement/useSpendingGoal.ts";
import { Stack } from "@mui/material";
import MonthSpendingGoal from "@pages/AssetManagement/pages/SpendingGoal/components/MonthSpendingGoal";
import RegularSpendingGoal from "@pages/AssetManagement/pages/SpendingGoal/components/RegularSpendingGoal";
import { useModal } from "@hooks/modal/useModal.tsx";
import { Form } from "@pages/AssetManagement/pages/SpendingGoal/components/RegularSpendingGoal/ModifyRegularSpendingGoal.tsx";
import ConfirmModal from "pages/AssetManagement/pages/SpendingGoal/components/RegularSpendingGoal/components/ConfirmModal";
import { useState } from "react";
import ModifyModal from "pages/AssetManagement/pages/SpendingGoal/components/MonthSpendingGoal/components/ModifyModal";
import { getDate } from "@pages/AssetManagement/pages/SpendingGoal/utils.ts";
import moment from "moment";
import { getAmount } from "@pages/AssetManagement/utils.ts";

function SpendingGoal() {
  const {
    offSpendAmount,
    onSpendAmount,
    yearMonth,
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

  const [isModify, setIsModify] = useState(false);

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

  const handleSubmit = (form: Form) => {
    if (onSpendAmount.spend_goal_amount !== "?") {
      openModal({
        modalElement: (
          <ConfirmModal
            closeModal={closeModal}
            handleApprove={() => {
              changeRegularGoal(form, true);
            }}
            handleReject={() => {
              changeRegularGoal(form, false);
            }}
          />
        ),
        isBackdropClickable: false,
      });
    } else {
      handleSetSpendingGoal({
        ...form,
        regular: "ON" as const,
        is_batch: true,
      });
    }
  };

  const changeRegularGoal = (form: Form, isBatch: boolean) => {
    handleSetSpendingGoal({
      ...form,
      regular: "ON" as const,
      is_batch: isBatch,
    });
    setIsModify(false);
    closeModal();
  };

  return (
    <Stack spacing={2}>
      <MonthSpendingGoal
        date={yearMonth}
        changeYearAndMonth={pickMonth}
        handleModify={handleModify}
        goal={offSpendAmount.spend_goal_amount}
        spent={offSpendAmount.spend_amount}
      />
      <RegularSpendingGoal
        handleModify={() => setIsModify(true)}
        handleSubmit={handleSubmit}
        closeModify={() => setIsModify(false)}
        isModify={isModify}
        goal={onSpendAmount.spend_goal_amount}
        startDate={getDate(onSpendAmount.start_date) ?? yearMonth}
        endDate={getDate(onSpendAmount.end_date) ?? yearMonth}
      />
    </Stack>
  );
}

export default SpendingGoal;
