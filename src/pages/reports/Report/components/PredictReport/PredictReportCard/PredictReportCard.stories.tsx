import { Meta } from "@storybook/react";
import PredictReportCard, {
  PredictReportCardProps,
} from "./PredictReportCard.tsx";
import { useState } from "react";
import { REPORTTYPE } from "@pages/reports/Report/components/PredictReport/utils.ts";
import { Button } from "@mui/material";
import EmptyPredictReportCard from "@pages/reports/Report/components/PredictReport/PredictReportCard/EmptyPredictReportCard.tsx";
import * as React from "react";

const meta = {
  title: "reports/Report/PredictReport/PredictReportCard",
  component: PredictReportCard,
  tags: ["autodocs"],
  args: {
    month: 5,
    type: {
      type: "used",
      color: "#735BF2",
      title: "월 지출 금액",
    },
    amount: 100000000,
    over: false,
    selected: true,
  },
  argTypes: {
    type: {
      description: "리포트의 타입을 나타냅니다.",
    },
    amount: {
      description: "리포트 타입에 맞는 지출 금액을 의미합니다.",
    },
    over: {
      description:
        "금액 초과 여부를 나타냅니다. 금액 초과인 경우 amount가 붉은 색으로 그려집니다.",
    },
    selected: {
      description: "선택한 타입의 포커싱 여부를 나타냅니다.",
    },
  },
} satisfies Meta<typeof PredictReportCard>;

export default meta;

export const Default = (args: PredictReportCardProps) => {
  return <PredictReportCard {...args} />;
};

export const Example = () => {
  const month = 5;
  const [selected, setSelected] = useState("used");
  const [isOver, setIsOver] = useState(false);

  return (
    <>
      {REPORTTYPE.map((type, idx) => (
        <PredictReportCard
          key={idx}
          month={month}
          type={type}
          amount={99999999}
          selected={selected === type.type}
          over={isOver}
          setSelected={setSelected}
        />
      ))}

      <Button onClick={() => setIsOver((prevState) => !prevState)}>
        예산 초과 여부 변경
      </Button>
    </>
  );
};

export const Empty = () => {
  const month = 5;
  const selected = "used";

  return (
    <>
      {REPORTTYPE.map((type, idx) => (
        <EmptyPredictReportCard
          key={idx}
          month={month}
          type={type}
          selected={selected === type.type}
        />
      ))}
    </>
  );
};
