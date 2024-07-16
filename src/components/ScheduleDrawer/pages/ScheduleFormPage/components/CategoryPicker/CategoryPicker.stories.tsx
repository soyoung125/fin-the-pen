import type { Meta } from "@storybook/react";
import CategoryPicker from "./CategoryPicker.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const queryClient = new QueryClient();
const meta = {
  title: "ui/ScheduleDrawer/category-picker/CategoryPicker",
  component: CategoryPicker,
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof CategoryPicker>;

export default meta;

export const Default = () => {
  return <CategoryPicker setIsCategoryPickerOpen={() => alert("hi")} />;
};
