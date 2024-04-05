import { Meta } from "@storybook/react";
import RegularSpendingGoal from "@pages/AssetManagement/pages/SpendingGoal/components/RegularSpendingGoal/index.ts";
import { RegularSpendingGoalProps } from "@pages/AssetManagement/pages/SpendingGoal/components/RegularSpendingGoal/RegularSpendingGoal.tsx";
import { useState } from "react";
import { Form } from "@pages/AssetManagement/pages/SpendingGoal/components/RegularSpendingGoal/ModifyRegularSpendingGoal.tsx";
import { useModal } from "@hooks/modal/useModal.tsx";
import ConfirmModal from "pages/AssetManagement/pages/SpendingGoal/components/RegularSpendingGoal/components/ConfirmModal";
import { Button } from "@mui/material";

const meta = {
  title: "AssetManagement/SpendingGoal/RegularSpendingGoal",
  component: RegularSpendingGoal,
  tags: ["autodocs"],
  args: {
    handleModify: () => alert("modify"),
    isModify: false,
    goal: "100000",
    startDate: "2024-01",
    endDate: "2024-02",
  },
  argTypes: {},
} satisfies Meta<typeof RegularSpendingGoal>;

export default meta;

export const Default = (args: RegularSpendingGoalProps) => {
  return <RegularSpendingGoal {...args} />;
};

export const Example = () => {
  const [isModify, setIsModify] = useState(false);
  const [haveGoal, setHaveGoal] = useState(false);
  const [value, setValue] = useState({
    spend_goal_amount: "10000000",
    start_date: "2024-01",
    end_date: "2024-02",
  });

  const { openModal, closeModal } = useModal();

  const handleSubmit = (form: Form) => {
    if (haveGoal) {
      openModal({
        modalElement: (
          <ConfirmModal
            closeModal={closeModal}
            handleApprove={() => {
              alert("지출 목표 변경");
              closeModal();
            }}
            handleReject={() => {
              alert("지출 목표 유지");
              closeModal();
            }}
          />
        ),
        isBackdropClickable: false,
      });
    }
    setIsModify(false);
    setValue(form);
  };

  return (
    <>
      <RegularSpendingGoal
        handleModify={() => setIsModify(true)}
        handleSubmit={handleSubmit}
        closeModify={() => setIsModify(false)}
        isModify={isModify}
        goal={value.spend_goal_amount}
        startDate={value.start_date}
        endDate={value.end_date}
      />
      <Button onClick={() => setHaveGoal((prevState) => !prevState)}>
        지출 목표 설정 여부 변경
      </Button>
    </>
  );
};
