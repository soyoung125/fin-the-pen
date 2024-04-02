import { useUser } from "@app/tanstack-query/useUser.ts";
import { useGoals } from "@app/tanstack-query/assetManagement/savingGoal/useGoals.ts";
import { useSetSavingGoal } from "@app/tanstack-query/assetManagement/savingGoal/useSetSavingGoal.ts";
import { SetPersonalGoalQuery } from "@app/types/asset.ts";
import { useSetPersonalGoal } from "@app/tanstack-query/assetManagement/savingGoal/useSetPersonalGoal.ts";

const useSavingGoal = () => {
  const { data: user } = useUser();
  const { data: goal, isPending, isError } = useGoals(user?.user_id ?? "");
  const { setSavingGoal } = useSetSavingGoal();
  const { setPersonalGoal } = useSetPersonalGoal();

  const handleSetSavingGoal = (yearAmount: number) => {
    setSavingGoal({
      user_id: user?.user_id ?? "",
      years_goal_amount: yearAmount.toString(),
    });
  };

  const handleSetPersonalGoal = (data: SetPersonalGoalQuery) => {
    setPersonalGoal({
      user_id: user?.user_id ?? "",
      ...data,
    });
  };

  return {
    goal,
    isPending,
    isError,
    handleSetSavingGoal,
    handleSetPersonalGoal,
  };
};

export default useSavingGoal;
