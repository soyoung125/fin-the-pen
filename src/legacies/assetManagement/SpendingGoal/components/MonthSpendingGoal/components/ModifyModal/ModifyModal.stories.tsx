import ModifyModal from "@legacies/assetManagement/SpendingGoal/components/MonthSpendingGoal/components/ModifyModal/ModifyModal.tsx";
import { Meta } from "@storybook/react";
import { Box, Button } from "@mui/material";
import { useModal } from "@hooks/modal/useModal.tsx";
import { useState } from "react";

const meta = {
  title: "AssetManagement/SpendingGoal/MonthSpendingGoal/ModifyModal",
  component: ModifyModal,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof ModifyModal>;

export default meta;

export const Example = () => {
  const { openModal, closeModal } = useModal();
  const [value, setValue] = useState(0);

  const handleChange = (v: number) => {
    setValue(v);
  };

  const handleModify = () => {
    openModal({
      modalElement: (
        <ModifyModal
          closeModal={closeModal}
          value={value}
          month="5"
          handleSubmit={handleChange}
        />
      ),
      isBackdropClickable: true,
    });
  };
  return (
    <>
      <Box>value: {value}</Box> <Button onClick={handleModify}>modify</Button>
    </>
  );
};
