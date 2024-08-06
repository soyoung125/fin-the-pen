import { CategoryReport } from "@app/types/report.ts";
import { generateRandomBubbles2 } from "@pages/reports/Report/components/BubbleChart/utils.ts";
import BubbleChart from "@pages/reports/Report/components/BubbleChart/BubbleChart.tsx";

function TutorialBubbleChart() {
  const list: CategoryReport[] = [
    {
      amount: 71000,
      rate: "20",
      category: "식비",
    },
    {
      amount: 71000,
      rate: "12",
      category: "미용",
    },
    {
      amount: 71000,
      rate: "8",
      category: "자동차",
    },
    {
      amount: 71000,
      rate: "7",
      category: "패션/쇼핑",
    },
    {
      amount: 71000,
      rate: "6",
      category: "카페",
    },
  ];
  return (
    <>
      <BubbleChart bubbles={generateRandomBubbles2(list)} />
    </>
  );
}

export default TutorialBubbleChart;
