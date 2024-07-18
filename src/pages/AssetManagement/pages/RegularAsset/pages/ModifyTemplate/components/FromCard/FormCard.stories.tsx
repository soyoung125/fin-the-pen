import { Meta } from "@storybook/react";
import FormCard from "@pages/AssetManagement/pages/RegularAsset/pages/ModifyTemplate/components/FromCard/FormCard.tsx";

const meta: Meta<typeof FormCard> = {
  title: "AssetManagement/RegularAsset/ModifyTemplate/FormCard",
  component: FormCard,
  tags: ["autodoce"],
  args: { title: "일정명" },
  argTypes: {},
};

export default meta;

export const Example = () => {
  return (
    <FormCard title="일정명">
      <input />
    </FormCard>
  );
};
