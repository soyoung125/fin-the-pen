import { Meta } from "@storybook/react";
import { Button, Typography } from "@mui/material";
import { useToast } from "@hooks/toast/useToast.tsx";

export const Example = () => {
  const { openToast, closeToast } = useToast();
  const handleClickToastOpen = () => {
    openToast({
      hideDuration: 6000,
      toastElement: <Typography flexGrow={1}>toast</Typography>,
      color: "primary.main",
      actionsElement: (
        <Button color="inherit" size="small" onClick={closeToast}>
          UNDO
        </Button>
      ),
    });
  };

  return (
    <>
      <Button variant="outlined" color="info" onClick={handleClickToastOpen}>
        토스트 열기
      </Button>
    </>
  );
};

const meta = {
  title: "common/useToast",
  component: Example,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof Example>;

export default meta;
