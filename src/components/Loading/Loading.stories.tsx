import Loading from "@components/Loading/Loading.tsx";
import { Meta } from "@storybook/react";

const meta = {
  title: "common/Loading",
  component: Loading,
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Loading>;

export default meta;

export const Default = () => {
  return <Loading />;
};
