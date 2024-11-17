import { useUser } from "@app/tanstack-query/useUser.ts";
import { useReports } from "@app/tanstack-query/reports/useReports.ts";

const useReport = (initialDate: string) => {
  const { data: user } = useUser();

  const {
    data: report,
    isPending,
    isError,
  } = useReports({
    user_id: user?.user_id ?? "",
    date: initialDate,
  });

  const reportList =
    report?.category_consume_list === "?" ? [] : report?.category_consume_list;

  const maxPercent = Math.max(
    ...(reportList?.map((l) => parseFloat(l.rate)) ?? [])
  );

  return {
    report,
    isPending,
    isError,
    reportList,
    maxPercent,
  };
};

export default useReport;
