import { useUser } from "@app/tanstack-query/useUser.ts";
import { useAssetsByCategory } from "@app/tanstack-query/assetManagement/AssetByCategory/useAssetsByCategory.ts";
import { useState } from "react";
import moment from "moment/moment";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";
import { useSetAssetsByCategory } from "@app/tanstack-query/assetManagement/AssetByCategory/useSetAssetsByCategory.ts";
import { setAssetByCategory } from "@app/types/asset.ts";
import { setAssetsByCategory } from "@redux/slices/assetSlice.tsx";
import { useDeleteAssetsByCategory } from "@app/tanstack-query/assetManagement/AssetByCategory/useDeleteAssetsByCategory.ts";
import { useDialog } from "@hooks/dialog/useDialog.tsx";

const useAssetByCategory = () => {
  const [yearMonth, setYearMonth] = useState(moment().format("YYYY-MM"));
  const { openMonthPicker } = useDatePicker();
  const { openConfirm } = useDialog();

  const { data: user } = useUser();
  const {
    data: assetsByCategory,
    isError,
    isPending,
  } = useAssetsByCategory(user?.user_id ?? "", yearMonth);
  const { SetAssetsByCategory } = useSetAssetsByCategory();
  const { deleteAssetsByCategory } = useDeleteAssetsByCategory();

  const pickMonth = async () => {
    const newMonth = await openMonthPicker(yearMonth);
    setYearMonth(newMonth.format("YYYY-MM"));
  };

  const getCategoryList = (category: {
    name: string;
    subCategory: string[];
  }) => {
    return (
      assetsByCategory?.category_list.find(
        (c) => c.category_name === category.name
      ) ?? {
        category_name: category.name,
        category_total: "0",
        list: category.subCategory.map((n) => {
          return {
            name: n,
            value: "?",
          };
        }),
      }
    );
  };

  const setAssetByCategory = (form: setAssetByCategory) => {
    SetAssetsByCategory({ ...form, user_id: user?.user_id });
  };

  const deleteAssetByCategory = async () => {
    const answer = await openConfirm({
      title: "알림",
      content: "모든 정보를 초기화하시겠습니까?",
      approveText: "네",
      rejectText: "아니오",
    });
    if (answer) {
      deleteAssetsByCategory(user?.user_id ?? "", yearMonth);
    }
  };

  return {
    yearMonth,
    assetsByCategory,
    isError,
    isPending,
    pickMonth,
    getCategoryList,
    setAssetByCategory,
    deleteAssetByCategory,
  };
};

export default useAssetByCategory;
