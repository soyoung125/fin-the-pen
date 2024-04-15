import { useUser } from "@app/tanstack-query/useUser.ts";
import { useAssetsByCategory } from "@app/tanstack-query/assetManagement/AssetByCategory/useAssetsByCategory.ts";
import { useState } from "react";
import moment from "moment/moment";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";

const useAssetByCategory = () => {
  const [yearMonth, setYearMonth] = useState(moment().format("YYYY-MM"));
  const { openMonthPicker } = useDatePicker();

  const { data: user } = useUser();
  const {
    data: assetsByCategory,
    isError,
    isPending,
  } = useAssetsByCategory(user?.user_id ?? "", yearMonth);

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

  return {
    yearMonth,
    assetsByCategory,
    isError,
    isPending,
    pickMonth,
    getCategoryList,
  };
};

export default useAssetByCategory;
