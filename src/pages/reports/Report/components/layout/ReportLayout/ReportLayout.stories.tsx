import { Meta } from "@storybook/react";
import ReportLayout, { ReportLayoutProps } from "./ReportLayout.tsx";

const meta = {
  title: "reports/Report/layout/ReportLayout",
  component: ReportLayout,
  tags: ["autodocs"],
  args: {
    title: "리포트 이름",
    actionContent: "서브 액션 컨텐트",
    handleClick: () => alert("click"),
    content: "리포트 콘텐츠 컴포넌트가 올 자리",
  },
  argTypes: {
    title: {
      description: "리포트 카드의 제목입니다.",
    },
    actionContent: {
      description: "리포트 카드에 사용할 서브 액션 텍스트를 나타냅니다.",
    },
    handleClick: {
      description: "서브 동작의 액션 핸들러입니다.",
    },
    content: {
      description:
        "컴포넌트가 올 자리입니다. 실제 환경에서는 텍스트가 오지 않습니다. ",
    },
  },
} satisfies Meta<typeof ReportLayout>;

export default meta;

export const Default = (args: ReportLayoutProps) => {
  return <ReportLayout {...args} />;
};
