import SettingDrawer from "@pages/AssetManagement/pages/SavingGoal/components/GoalSetting/SettingDrawer/SettingDrawer.tsx";
import { getAmount } from "@pages/AssetManagement/utils.ts";
import { useDialog } from "@hooks/dialog/useDialog.tsx";
import { MonthSavingGoal } from "@app/types/asset.ts";
import useSavingGoal from "@hooks/assetManagement/useSavingGoal.ts";
import { Puller } from "@components/ScheduleDrawer/ScheduleDrawer.styles.ts";
import { useSwipeableDrawer } from "@hooks/useSwipeableDrawer.tsx";

export const useSettingGoalDrawer = () => {
  const { openDrawer, closeDrawer } = useSwipeableDrawer();
  const { handleSetSavingGoal } = useSavingGoal();
  const { openConfirm } = useDialog();

  const openSettingGaolDrawer = (saving?: MonthSavingGoal) => {
    const handleSubmit = async (amount: number) => {
      const answer = await openConfirm({
        title: "알림",
        content: "모든 정보를 수정하시겠습니까?",
        approveText: "네",
        rejectText: "아니오",
      });

      if (answer) {
        handleSetSavingGoal(amount);
        closeDrawer();
      }
    };

    openDrawer(
      <>
        <Puller />
        <SettingDrawer
          closeDrawer={closeDrawer}
          handleSubmit={handleSubmit}
          yearAmount={getAmount(saving?.years_goal_amount)}
          monthAmount={getAmount(saving?.months_goal_amount)}
        />
      </>
    );
  };

  return { openSettingGaolDrawer, closeSettingGoalDrawer: closeDrawer };
};
