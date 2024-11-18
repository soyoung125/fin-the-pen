import { useUser } from "@app/tanstack-query/useUser.ts";
import { useCategoryDetail } from "@app/tanstack-query/reports/useCategoryDetail.ts";
import { useParams } from "react-router-dom";

const useCategoryReport = (initialDate: string) => {
  const { data: user } = useUser();
  const params = useParams();
  const {
    data: report,
    isPending,
    isError,
  } = useCategoryDetail({
    user_id: user?.user_id ?? "",
    date: initialDate,
    category: params.category?.replace("-", "/") ?? "",
  });

  return {
    report,
    isPending,
    isError,
  };
};

export default useCategoryReport;
