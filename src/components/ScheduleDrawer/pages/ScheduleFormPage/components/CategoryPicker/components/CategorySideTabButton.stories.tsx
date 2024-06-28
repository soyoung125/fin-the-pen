import type { Meta } from "@storybook/react";
import CategorySideTabButton, {
  CategorySideTabProps,
} from "./CategorySideTabButton.tsx";
import { useState } from "react";

const meta = {
  title: "ui/ScheduleDrawer/category-picker/CategorySideTabButton",
  component: CategorySideTabButton,
  tags: ["autodocs"],
  args: {
    tab: "탭",
    isSelected: true,
    categoryCount: 3,
    onClick: () => alert("clicked"),
  },
  argTypes: {},
} satisfies Meta<typeof CategorySideTabButton>;

export default meta;

export const Default = (args: CategorySideTabProps) => {
  return (
    <div style={{ width: "500px" }}>
      <CategorySideTabButton {...args} />
    </div>
  );
};

export const Dynamic = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div style={{ width: "500px" }}>
      <CategorySideTabButton
        tab="hi"
        categoryCount={5}
        isSelected={isSelected}
        onClick={() => setIsSelected(!isSelected)}
      />
    </div>
  );
};

export const Dynamics = () => {
  const [tabList, setTabList] = useState([
    { id: 0, isActive: true, count: 3, tab: "식비" },
    { id: 1, isActive: false, count: 5, tab: "교통" },
    { id: 2, isActive: false, count: 2, tab: "구독" },
    { id: 3, isActive: false, count: 1, tab: "기타" },
  ]);

  return (
    <div style={{ width: "200px" }}>
      {tabList.map((tab) => (
        <CategorySideTabButton
          key={tab.id}
          isSelected={tab.isActive}
          tab={tab.tab}
          categoryCount={tab.count}
          onClick={() =>
            setTabList((prev) => {
              const list = [...prev].map((t) => ({ ...t, isActive: false }));
              list[tab.id].isActive = true;
              return list;
            })
          }
        />
      ))}
    </div>
  );
};
