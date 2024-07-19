import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { RequestSchedule, Schedule } from "@app/types/schedule.ts";
import { RootState } from "../store.ts";
import { INIT_SCHEDULE } from "@constants/schedule.ts";
import { Template } from "@app/types/template.ts";

interface InitialState {
  // 메인
  date: moment.Moment;
  // 전체 일정 데이터
  schedules: Schedule[];
  // 서랍에 표시될 일정 1개
  scheduleForm: RequestSchedule;
  // 필터
  filtered: string[];
  filtered_date: {
    [key: string]: string;
  };
  selectedTemplate: Template;
}

const initialState: InitialState = {
  date: moment(new Date()),
  schedules: [],
  selectedTemplate: {
    id: -1,
    template_name: "",
    user_id: "",
    category_name: "",
    amount: "",
    statement: "",
  },
  scheduleForm: INIT_SCHEDULE(moment().format("YYYY-MM-DD")),
  filtered: [],
  filtered_date: {
    start: "",
    end: "",
  },
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setDrawerScheduleForm: (state, action) => {
      state.scheduleForm = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.date = action.payload;
    },
    updateFilter: (state, action) => {
      /**
       * 1. 배열 안에 이미 있는 단어라면 제거
       * 2. 배열 안에 없는 단어라면 추가
       */

      if (state.filtered.includes(action.payload as string)) {
        state.filtered = state.filtered.filter(
          (filteredWord) => filteredWord !== action.payload
        );
      } else {
        const set = new Set(
          [...state.filtered].concat(action.payload as string)
        );
        state.filtered = Array.from(set);
      }
    },
    setFilteredDate: (
      state,
      action: PayloadAction<{ type: string; date: string }>
    ) => {
      state.filtered_date[action.payload.type] = action.payload.date;
    },
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
    resetSelectedTemplate: (state) => {
      state.selectedTemplate = {
        id: -1,
        template_name: "",
        user_id: "",
        category_name: "",
        amount: "",
        statement: "",
      };
    },
  },
});
export const {
  setDrawerScheduleForm,
  setSelectedDate,
  updateFilter,
  setFilteredDate,
  setSelectedTemplate,
  resetSelectedTemplate,
} = scheduleSlice.actions;

export const selectDate = (state: RootState) => {
  const date = moment((state.schedule as InitialState).date);
  return date.format("YYYY-MM-DD");
};
export const selectMonth = (state: RootState) => {
  const date = moment((state.schedule as InitialState).date);
  return date.format("YYYY-MM");
};
export const selectFiltered = (state: RootState): string[] =>
  (state.schedule as InitialState).filtered;
export const selectFilteredDate = (state: RootState) =>
  (state.schedule as InitialState).filtered_date;
export const selectScheduleForm = (state: RootState) =>
  (state.schedule as InitialState).scheduleForm;
export const selectStartDate = (state: RootState) =>
  (state.schedule as InitialState).scheduleForm?.start_date;
export const selectSelectedTemplate = (state: RootState) =>
  (state.schedule as InitialState).selectedTemplate;

export default scheduleSlice.reducer;
