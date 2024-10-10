import { Meta } from "@storybook/react";
import ReportCategorySummary, {
  ReportCategorySummaryProps,
} from "./ReportCategorySummary.tsx";
import { useState } from "react";
import ReportCategorySummarySkeleton from "@pages/reports/ReportCategoryDetails/components/ReportCategorySummary/ReportCategorySummarySkeleton.tsx";
import { Button } from "@mui/material";

const meta = {
  title: "reports/ReportCategoryDetails/ReportCategorySummary",
  component: ReportCategorySummary,
  tags: ["autodocs"],
  args: {
    goal: 1000000,
    amount: 750000,
    expect: 150000,
    balance: 100000,
    category: "식비",
  },
  argTypes: {},
} satisfies Meta<typeof ReportCategorySummary>;

export default meta;

export const Default = (args: ReportCategorySummaryProps) => {
  return <ReportCategorySummary {...args} />;
};

export const Skeleton = () => {
  const [isPending, setIsPending] = useState(true);

  return (
    <>
      {isPending ? (
        <ReportCategorySummarySkeleton />
      ) : (
        <ReportCategorySummary
          goal={1000000}
          amount={750000}
          expect={150000}
          balance={100000}
          category="식비"
        />
      )}
      <Button onClick={() => setIsPending((prevState) => !prevState)}>
        로딩상태 변경
      </Button>
    </>
  );
};
