import { Box, IconButton, Stack } from "@mui/material";
import InputModal from "./InputModal.tsx";
import { PersonalGoal, SetPersonalGoalQuery } from "@app/types/asset.ts";
import { getAmount } from "@pages/AssetManagement/utils.ts";
import { useDialog } from "@hooks/dialog/useDialog.tsx";
import { useModal } from "@hooks/modal/useModal.tsx";
import RoundedPaper from "@components/common/RoundedPaper.tsx";
import GoalCard from "pages/AssetManagement/pages/SavingGoal/components/Personal/components/GoalCard";
import IconSVG from "@components/common/IconSVG";
import React from "react";

interface PersonalProps {
  personal?: PersonalGoal;
  handleSetPersonalGoal: (data: SetPersonalGoalQuery) => void;
}

function Personal({ personal, handleSetPersonalGoal }: PersonalProps) {
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
            closeModal={closeModal}
            personal={personal}
            handleSetPersonalGoal={handleSetPersonalGoal}
          />
        ),
        isBackdropClickable: true,
      });
    }
  };

  return (
    <Box mt="50px">
      <RoundedPaper my={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box sx={{ fontSize: "18px", fontWeight: "700" }}>
            나만의 저축 목표
          </Box>
          <IconButton color="primary" onClick={handleModify}>
            <IconSVG id={"filter-main"} size={24} />
          </IconButton>
        </Stack>

        <Stack direction="row" spacing={4} mt={3.5}>
          <GoalCard
            title={personal?.goal_name ?? ""}
            subTitle={`${personal?.period}까지`}
            amount={getAmount(personal?.goal_amount) ?? 0}
          />
          <GoalCard
            title="저축 목표액"
            subTitle="한달 기준"
            amount={getAmount(personal?.month_amount) ?? 0}
          />
        </Stack>
      </RoundedPaper>
    </Box>
  );
}

export default Personal;
