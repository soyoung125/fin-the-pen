import {
  HighLightDescription,
  HighLightDescriptionProps,
} from "@components/Tutorial/components/HighlightDescription/HighLightDescription.tsx";
import { Meta } from "@storybook/react";
import { Box } from "@mui/material";

const meta = {
  title: "common/Tutorial/HighLightDescription",
  component: HighLightDescription,
  tags: ["autodocs"],
  args: { position: "top", message: "튜토리얼을 위한 설명글" },
  argTypes: {
    position: {
      description: "설명글을 표시할 위치를 나타냅니다.",
    },
    message: {
      description: "표시할 설명글을 의미합니다.",
    },
    isCentered: {
      description: "설명을 가운데 정렬시킬 지 왼쪽으로 정렬시킬지 의미합니다.",
    },
  },
} satisfies Meta<typeof HighLightDescription>;

export default meta;

export const Default = (args: HighLightDescriptionProps) => {
  return (
    <Box height={150} bgcolor={"#000"}>
      <HighLightDescription {...args} />
    </Box>
  );
};
