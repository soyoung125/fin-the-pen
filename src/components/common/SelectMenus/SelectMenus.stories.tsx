import { Meta } from "@storybook/react";

import SelectMenus, {
  SelectMenusProps,
} from "@components/common/SelectMenus/SelectMenus.tsx";
import { useState } from "react";

const meta = {
  title: "common/SelectMenus",
  component: SelectMenus,
  tags: ["autodocs"],
  args: {
    options: ["최신순", "과거순", "높은 금액순", "낮은 금액순"],
    selectedOption: "최신순",
    setSelectedOption: () => alert("아래에서 테스트해주세요"),
  },
  argTypes: {
    options: {
      description: "선택할 수 있는 옵션들. 최소 1개 이상의 옵션이 필요합니다.",
    },
    selectedOption: {
      description:
        "현재 선택된 옵션 state. 기본 값은 첫 번째 옵션으로 줘야 합니다.",
    },
    setSelectedOption: {
      description: "옵션을 선택했을 때 실행되는 setState입니다.",
    },
  },
} satisfies Meta<typeof SelectMenus>;

export default meta;

export const Default = (args: SelectMenusProps) => {
  return <SelectMenus {...args} />;
};

export const Example = () => {
  const options = ["옵션1", "옵션2", "옵션3", "옵션4"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  return (
    <>
      <div>현재 상태 : {selectedOption}</div>
      <SelectMenus
        options={options}
        selectedOption={selectedOption}
        setSelectedOption={(v) => setSelectedOption(v)}
      />
      <div style={{ height: "300px" }}></div>
    </>
  );
};
