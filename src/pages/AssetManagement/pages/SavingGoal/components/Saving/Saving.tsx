import { Box, IconButton, Stack } from "@mui/material";
import RoundedPaper from "../../../../../../components/common/RoundedPaper.tsx";
import RoundedBorderBox from "../../../../../../components/common/RoundedBorderBox.tsx";
import InputModal from "./InputModal.tsx";
import { MonthSavingGoal } from "@app/types/asset.ts";
import { getAmount } from "@pages/AssetManagement/utils.ts";
import { useDialog } from "@hooks/dialog/useDialog.tsx";
import { useModal } from "@hooks/modal/useModal.tsx";
import filter_main from "@assets/icons/header/filter_main.svg";

interface SavingProps {
  saving?: MonthSavingGoal;
  handleSetSavingGoal: (amount: number) => void;
}

function Saving({ saving, handleSetSavingGoal }: SavingProps) {
  const { openConfirm } = useDialog();
  const { openModal, closeModal } = useModal();

  const handleModify = async () => {
    const answer = await openConfirm({
      title: "알림",
      content: "정보를 수정하시겠습니까?",
      approveText: "네",
      rejectText: "아니오",
    });
    if (answer) {
      openModal({
        modalElement: (
          <InputModal
            closeSavingGoalModal={closeModal}
            saving={saving}
            handleSetSavingGoal={handleSetSavingGoal}
          />
        ),
        isBackdropClickable: true,
      });
    }
  };

  return (
    <Box mt="30px">
      <RoundedPaper my={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pb={1}
        >
          <Box sx={{ fontSize: "18px", fontWeight: "700" }}>
            한 해 저축 목표
          </Box>
          <IconButton color="primary" onClick={handleModify} sx={{ p: 0 }}>
            <img src={filter_main} alt="filter" />
          </IconButton>
        </Stack>
        <RoundedBorderBox>
          <Box
            sx={{
              typography: "h6",
              fontWeight: "bold",
              color: "primary.main",
              textAlign: "end",
              p: 2,
            }}
          >
            {getAmount(saving?.years_goal_amount).toLocaleString()}원
          </Box>
        </RoundedBorderBox>

        <Box sx={{ fontSize: "18px", fontWeight: "700" }} pb={1} pt={2}>
          월 저축 목표
        </Box>
        <RoundedBorderBox>
          <Box
            sx={{
              typography: "h6",
              fontWeight: "bold",
              color: "primary.main",
              textAlign: "end",
              p: 2,
            }}
          >
            {getAmount(saving?.months_goal_amount).toLocaleString()}원
          </Box>
        </RoundedBorderBox>
      </RoundedPaper>
    </Box>
  );
}

export default Saving;
