import { Meta } from "@storybook/react";
import Stepper, { StepperProps } from "@components/common/Stepper/Stepper.tsx";
import { useState } from "react";
import { Button, Stack } from "@mui/material";

const meta = {
  title: "common/Tutorial/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  args: { size: 4, focused: 1 },
  argTypes: {
    size: { description: "총 단계의 크기를 의미합니다." },
    focused: { description: "진행되고 있는 단계를 나타냅니다." },
  },
} satisfies Meta<typeof Stepper>;

export default meta;

export const Default = (args: StepperProps) => {
  return <Stepper {...args} />;
};

export const Example = () => {
  const [step, setStep] = useState(0);
  const [stepSize, setStepSize] = useState(4);

  return (
    <div>
      <Stack direction="row" spacing={1}>
        <Button onClick={() => setStepSize((prev) => prev + 1)}>
          size 증가
        </Button>
        <Button onClick={() => setStepSize((prev) => prev - 1)}>
          size 감소
        </Button>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Button onClick={() => setStep((prev) => prev + 1)}>step 증가</Button>
        <Button onClick={() => setStep((prev) => prev - 1)}>step 감소</Button>
      </Stack>

      <Stepper size={stepSize} focused={step} />
    </div>
  );
};
