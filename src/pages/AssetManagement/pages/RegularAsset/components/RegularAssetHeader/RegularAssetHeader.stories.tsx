import RegularAssetHeader, {
  RegularAssetHeaderProps,
} from "@pages/AssetManagement/pages/RegularAsset/components/RegularAssetHeader/RegularAssetHeader.tsx";
import { Meta } from "@storybook/react";
import { useState } from "react";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";

const meta = {
  title: "AssetManagement/RegularAsset/RegularAssetHeader",
  component: RegularAssetHeader,
  tags: ["autodocs"],
  args: {
    title: "정기 입출금 내역",
    startDate: "2024.03.01",
    endDate: "2024.04.01",
    changeDate: () => alert("change"),
    clickDetail: () => alert("show detail"),
  },
  argTypes: {},
} satisfies Meta<typeof RegularAssetHeader>;

export default meta;

export const Default = (args: RegularAssetHeaderProps) => {
  return <RegularAssetHeader {...args} />;
};

const useStorybookDate = () => {
  const [period, setPeriod] = useState({
    start: "2023-05-01",
    end: "2023-06-01",
  });
  const { openDayPeriodPicker } = useDatePicker();

  const pickDate = async () => {
    const newMonth = await openDayPeriodPicker(period.start, period.end);
    setPeriod(newMonth);
  };

  return {
    period,
    pickDate,
  };
};

export const Example = () => {
  const { period, pickDate } = useStorybookDate();

  return (
    <RegularAssetHeader
      title={"정기 입출금"}
      startDate={period.start}
      endDate={period.end}
      changeDate={pickDate}
    />
  );
};
