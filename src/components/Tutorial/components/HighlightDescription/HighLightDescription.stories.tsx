import { HighLightDescription } from "@components/Tutorial/components/HighlightDescription/HighLightDescription.tsx";
import { Meta } from "@storybook/react";
import { Box } from "@mui/material";

const meta = {
  title: "common/Tutorial/HighLightDescription",
  component: HighLightDescription,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof HighLightDescription>;

export default meta;

export const Default = () => {
  return (
    <Box height={150} bgcolor={"#000"}>
      <HighLightDescription
        position={"top"}
        message={"튜토리얼을 위한 설명글"}
      />
    </Box>
  );
};
