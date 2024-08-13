import { useAppDispatch, useAppSelector } from "@redux/hooks.ts";
import { selectAssetMenu, setAssetMenu } from "@redux/slices/assetSlice.tsx";
import assetManagements from "@constants/managements.ts";
import { useNavigate } from "react-router-dom";

const useAsset = () => {
  const assetMenu = useAppSelector(selectAssetMenu);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const setMenu = (menu: number, replace = true) => {
    dispatch(setAssetMenu(menu));
    navigate(assetManagements[menu].path, { replace: replace });
  };

  const goSpendingGoal = (replace?: boolean) => {
    setMenu(1, replace);
  };

  return {
    assetMenu,
    setMenu,
    goSpendingGoal,
  };
};

export default useAsset;
