/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import {
  RequestSchedule,
  Schedule,
  ViewModeValue,
} from "@app/types/schedule.ts";
import { AnalysisData } from "@app/types/common.ts";
import { CATEGORIES, COLORLIST } from "@constants/categories.ts";
import { RootState } from "../store.ts";
import { INIT_SCHEDULE } from "@constants/schedule.ts";

interface InitialState {
  // 메인
  date: moment.Moment;
  viewMode: ViewModeValue;
  // 전체 일정 데이터
  schedules: Schedule[];
  // 서랍에 표시될 일정 1개
  scheduleForm: RequestSchedule | null;
  // 분석 페이지에 표시될 데이터
  analyzedData: {
    data: AnalysisData[];
    total: number;
  };
  // 필터
  filtered: string[];
  filtered_date: {
    // start: string;
    // end: string;
    [key: string]: string;
  };
}

const initialState: InitialState = {
  date: moment(new Date()),
  viewMode: "asset",
  schedules: [],
  scheduleForm: INIT_SCHEDULE(moment().format("YYYY-MM-DD")),
  analyzedData: {
    data: [],
    total: 0,
  },
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
    setSchedules: (state, action) => {
      state.schedules = action.payload;
    },
    setDrawerScheduleForm: (state, action) => {
      state.scheduleForm = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.date = action.payload;
    },
    updateAnalyzedData: (state) => {
      /**
       * 1. 선택한 월의 일정
       * 2. 필터에서 설정한 시작일 뒤의 일정
       * 3. 필터에서 설정한 종료일 전의 일정
       * 4. 필터에서 선택한 카테고리 일정 제외
       * 한 일정에서 카테고리별로 일정을 나누고 그래프를 그리기 위한 데이터 생성
       */
      const newData: AnalysisData[] = [];
      const dateExpression = (date: string) =>
        startExpression(date) && endExpression(date);
      const startExpression = (date: string) =>
        state.filtered_date.start === "" ||
        moment(date).isAfter(state.filtered_date.start);
      const endExpression = (date: string) =>
        state.filtered_date.end === "" ||
        moment(date).isBefore(state.filtered_date.end);
      const exeptionExpression = (s: Schedule) =>
        !state.filtered.includes(s.category);

      let newTotal = 0;
      const expenditureCategories = CATEGORIES.filter(
        (c) => c.type === "지출" || c.nestedType === "출금"
      );
      const schedules = state.schedules.filter(
        (s) =>
          state.date.isSame(s.start_date, "month") &&
          (dateExpression(s.start_date) || dateExpression(s.end_date)) &&
          exeptionExpression(s)
      );

      expenditureCategories.map((c, index) => {
        const schByCategory = schedules.filter((s) => s.category === c.title);
        const cnt = schByCategory.length;
        if (cnt > 0) {
          const spending = schByCategory.reduce(
            (result, schedule) => result + parseInt(schedule.amount, 10),
            0
          );
          if (spending > 0) {
            newData.push({
              id: c.title,
              label: c.title,
              nestedType: c.nestedType,
              value: spending,
              color: COLORLIST[index],
            });
            newTotal += spending;
          }
        }
      }, []);

      state.analyzedData = {
        data: newData.sort((a, b) => b.value - a.value),
        total: newTotal,
      };
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
    updateFiltersForce: (state, action) => {
      /**
       * mode가 write라면 들어온 categories를 state.filtered에 강제로 추가
       * mode가 remove라면 들어온 categories를 state.filtered에서 강제로 제거
       */
      const { mode, categories } = action.payload;
      switch (mode) {
        case "write":
          state.filtered = Array.from(
            new Set([...state.filtered].concat(categories))
          );
          break;
        case "remove":
          categories.forEach((cat: string) => {
            state.filtered = state.filtered.filter((f) => f !== cat);
          });
          break;
        default:
          alert("잘못된 요청입니다.");
      }
    },
    setFilteredDate: (
      state,
      action: PayloadAction<{ type: string; date: string }>
    ) => {
      state.filtered_date[action.payload.type] = action.payload.date;
    },
    revertFilter: (state, action) => {
      state.filtered = action.payload.filtered;
      state.filtered_date = action.payload.filtered_date;
    },
    initFilter: (state) => {
      state.filtered = [];
      state.filtered_date = {
        start: "",
        end: "",
      };
    },
    changeViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
});
export const {
  setSchedules,
  setDrawerScheduleForm,
  setSelectedDate,
  updateAnalyzedData,
  updateFilter,
  updateFiltersForce,
  setFilteredDate,
  revertFilter,
  initFilter,
  changeViewMode,
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
export const selectViewMode = (state: RootState) =>
  (state.schedule as InitialState).viewMode;
export const selectScheduleForm = (state: RootState) =>
  (state.schedule as InitialState).scheduleForm;
export const selectAnalyzedData = (state: RootState) =>
  (state.schedule as InitialState).analyzedData;
export const selectStartDate = (state: RootState) =>
  (state.schedule as InitialState).scheduleForm?.start_date;
export const selectRepeatEndDate = (state: RootState) =>
  (state.schedule as InitialState).scheduleForm?.period.repeat_end_line;

export default scheduleSlice.reducer;
