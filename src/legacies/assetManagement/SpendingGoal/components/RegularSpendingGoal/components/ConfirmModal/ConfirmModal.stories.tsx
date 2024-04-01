import { useModal } from "@hooks/modal/useModal.tsx";
import ConfirmModal from "@legacies/assetManagement/SpendingGoal/components/RegularSpendingGoal/components/ConfirmModal/index.ts";
import { Button } from "@mui/material";
import { Meta } from "@storybook/react";

export const Default = () => {
  const { openModal, closeModal } = useModal();

  const handleOpenConfirmModal = () => {
    openModal({
      modalElement: (
        <ConfirmModal
          closeModal={closeModal}
          handleApprove={() => {
            alert("approve!");
            closeModal();
          }}
          handleReject={() => {
            alert("reject!");
            closeModal();
          }}
        />
      ),
      isBackdropClickable: true,
    });
  };

  return <Button onClick={handleOpenConfirmModal}>모달</Button>;
};

const meta = {
  title: "Assetmanagement/SpendingGoal/RegularSpendingGoal/ConfirmModal",
  component: Default,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof Default>;

export default meta;
