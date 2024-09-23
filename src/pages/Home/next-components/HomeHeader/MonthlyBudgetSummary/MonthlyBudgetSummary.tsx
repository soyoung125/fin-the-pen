import { SummaryContainer, SummaryItem } from "./MonthBudgetSummary.styles.ts";
import SummaryCard from "@pages/Home/next-components/HomeHeader/MonthlyBudgetSummary/SummaryCard";

export interface MonthlyBudgetSummaryProps {
  income: number;
  expenditure: number;
  expect?: number;
  availableAmount?: number;
  dayTitle: string;
  isError?: boolean;
  showPredict?: boolean;
}

function MonthlyBudgetSummary({
  expenditure,
  income,
  expect,
  availableAmount,
  dayTitle,
  isError,
  showPredict,
}: MonthlyBudgetSummaryProps) {
  const budgetList = [
    {
      title: "수입",
      amount: income,
    },
    {
      title: "지출",
      amount: expenditure,
    },
  ];

  const predict = {
    availableAmount: "사용가능액",
    expect: "지출예정액",
  };

  if (isError) {
    return (
      <SummaryContainer>
        <SummaryItem>
          {budgetList.map(({ title }) => (
            <SummaryCard
              key={title}
              title={`${dayTitle} ${title}`}
              amount={0}
            />
          ))}
        </SummaryItem>

        {showPredict && (
          <SummaryItem $useable={true}>
            <SummaryCard title={predict.availableAmount} amount={0} />
          </SummaryItem>
        )}
      </SummaryContainer>
    );
  }

  return (
    <SummaryContainer>
      <SummaryItem>
        {budgetList.map(({ title, amount }) => (
          <SummaryCard
            key={title}
            title={`${dayTitle} ${title}`}
            amount={amount}
          />
        ))}
      </SummaryItem>

      {showPredict && (
        <SummaryItem $useable={true}>
          {expect !== undefined && (
            <SummaryCard title={predict.expect} amount={expect} />
          )}
          <SummaryCard
            title={predict.availableAmount}
            amount={availableAmount ?? 0}
          />
        </SummaryItem>
      )}
    </SummaryContainer>
  );
}

export default MonthlyBudgetSummary;
