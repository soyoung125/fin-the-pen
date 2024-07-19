import { Meta } from "@storybook/react";
import FormContainer, {
  FormContainerProps,
} from "@pages/AssetManagement/pages/RegularAsset/pages/ModifyTemplate/components/FormContainer/FormContainer.tsx";
import { ChangeEvent, useState } from "react";

const meta: Meta<typeof FormContainer> = {
  title: "AssetManagement/RegularAsset/ModifyTemplate/FormContainer",
  component: FormContainer,
  tags: ["autodocs"],
  args: {
    category: "급여",
    template_name: "월급날",
  },
  argTypes: {},
};

export default meta;

export const Default = (args: FormContainerProps) => {
  return <FormContainer {...args} />;
};

export const Example = () => {
  const [eventName, setEventName] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEventName(event.target.value);
  };

  return (
    <FormContainer
      category="급여"
      template_name={eventName}
      handleChange={handleChange}
      handleClick={() => alert("modify category")}
    />
  );
};
