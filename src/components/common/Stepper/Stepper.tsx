import { Stack } from "@mui/material";
import Circle from "@components/common/Stepper/Circle.tsx";

export interface StepperProps {
  size: number;
  focused: number;
}

function Stepper({ size, focused }: StepperProps) {
  return (
    <Stack direction="row" spacing="14px">
      {Array.from({ length: size }).map((_, i) => (
        <Circle key={i} focused={focused === i} />
      ))}
    </Stack>
  );
}

export default Stepper;
