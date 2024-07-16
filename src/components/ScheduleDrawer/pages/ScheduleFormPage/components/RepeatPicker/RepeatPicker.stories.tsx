import type { Meta } from "@storybook/react";
import RepeatContainer from "./index.tsx";
import RepeatPicker from "./index.tsx";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { INIT_PERIOD, INIT_REPEAT } from "@constants/schedule.ts";
import moment from "moment";
import { Provider } from "react-redux";
import { RepeatPickerProps } from "./RepeatPicker.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const MockedState = {
  schedule: {
    start_date: moment().format("YYYY-MM-DD"),
    repeat: INIT_REPEAT(moment()),
    period: INIT_PERIOD(moment()),
  },
  status: "idle",
  error: null,
};

const queryClient = new QueryClient();

const MockStore = ({ children }: { children: JSX.Element }) => (
  <QueryClientProvider client={queryClient}>
    <Provider
      store={configureStore({
        reducer: {
          schedule: createSlice({
            name: "schedule",
            initialState: MockedState,
            reducers: {
              setDrawerSchedule: (state, action) => {
                state.schedule = action.payload;
              },
            },
          }).reducer,
        },
      })}
    >
      {children}
    </Provider>
  </QueryClientProvider>
);

const meta = {
  title: "ui/ScheduleDrawer/repeat-picker",
  component: RepeatContainer,
  tags: ["autodocs"],
  args: {
    setIsRepeatPickerOpen: () => alert("hi"),
  },
  excludeStories: /.*MockedState$/,
} satisfies Meta<typeof RepeatContainer>;

export default meta;

export const Default = (args: RepeatPickerProps) => {
  return (
    <MockStore>
      <RepeatPicker {...args} />
    </MockStore>
  );
};
