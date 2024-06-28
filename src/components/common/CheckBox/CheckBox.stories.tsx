import CheckBox from "@components/common/CheckBox/index.ts";
import { Meta } from "@storybook/react";
import { useState } from "react";
import { FormControlLabel, FormGroup } from "@mui/material";
import { CheckBoxProps } from "@components/common/CheckBox/CheckBox.tsx";

const meta = {
  title: "common/CheckBox",
  component: CheckBox,
  tags: ["autodocs"],
  args: { checked: true },
  argTypes: {},
} satisfies Meta<typeof CheckBox>;

export default meta;

export const Default = (args: CheckBoxProps) => {
  return <CheckBox {...args} />;
};

export const Example = () => {
  const [selected, setSelected] = useState<number[]>([]);

  const handleChange = (num: number) => {
    if (selected.includes(num)) {
      setSelected(selected.filter((s) => s !== num));
    } else {
      setSelected(selected.concat(num));
    }
  };

  return (
    <FormGroup>
      {Array.from({ length: 3 }, (_, i) => i + 1).map((num) => (
        <FormControlLabel
          key={num}
          control={
            <CheckBox
              checked={selected.includes(num)}
              handleChange={() => handleChange(num)}
            />
          }
          label={`number ${num}`}
        />
      ))}
    </FormGroup>
  );
};
