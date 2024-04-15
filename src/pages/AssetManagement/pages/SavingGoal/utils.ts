import { PersonalGoal, PersonalGoalForm } from "@app/types/asset.ts";
import moment from "moment";
import { getAmount } from "@pages/AssetManagement/utils.ts";

export const getPersonalForm = (data?: PersonalGoal): PersonalGoalForm => {
  if (!data || data.period === "?") {
    return {
      personal_goal: "",
      goal_amount: 0,
      period: moment().add(1, "year").format("YYYY-MM-DD"),
    };
  }
  return {
    personal_goal: data.goal_name,
    goal_amount: getAmount(data.goal_amount),
    period: data.period,
  };
};
