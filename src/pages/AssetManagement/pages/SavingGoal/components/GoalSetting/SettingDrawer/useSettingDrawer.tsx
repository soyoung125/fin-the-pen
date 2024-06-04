import { useOverlay } from "@hooks/use-overlay/useOverlay.tsx";
import { styled, SwipeableDrawer } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import SettingDrawer from "@pages/AssetManagement/pages/SavingGoal/components/GoalSetting/SettingDrawer/SettingDrawer.tsx";
import { getAmount } from "@pages/AssetManagement/utils.ts";
import { useDialog } from "@hooks/dialog/useDialog.tsx";
import { MonthSavingGoal } from "@app/types/asset.ts";
import useSavingGoal from "@hooks/assetManagement/useSavingGoal.ts";
import { Puller } from "@components/ScheduleDrawer/ScheduleDrawer.styles.ts";

export const useSettingGoalDrawer = () => {
  const { openOverlay, closeOverlay } = useOverlay();
  const { handleSetSavingGoal } = useSavingGoal();
  const { openConfirm } = useDialog();

  const toggleDrawer = (newOpen: boolean) => () => {
    !newOpen && closeOverlay();
  };

  const Root = styled("div")(() => ({
    height: "100%",
  }));

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
        closeOverlay();
      }
    };

    openOverlay(
      <Root>
        <CssBaseline />
        <SwipeableDrawer
          anchor="bottom"
          open={true}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          disableSwipeToOpen={true}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            style: {
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              height: "calc(100dvh - 45px)",
            },
          }}
        >
          <Puller />
          <SettingDrawer
            closeDrawer={closeOverlay}
            handleSubmit={handleSubmit}
            yearAmount={getAmount(saving?.years_goal_amount)}
            monthAmount={getAmount(saving?.months_goal_amount)}
          />
        </SwipeableDrawer>
      </Root>
    );
  };

  return { openSettingGaolDrawer, closeSettingGoalDrawer: closeOverlay };
};
