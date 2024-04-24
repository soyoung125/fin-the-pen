/* eslint-disable max-len */

import { Category, EXPENDITURE, INCOME } from "@constants/categories.ts";

interface DaySchedulesInterface {
  id?: string;
  user_id?: string;
  event_name: string;
  alarm: boolean;
  date: string;
  start_time: string;
  end_time: string;
  repeating_cycle: string;
  repeat_deadline: string;
  repeat_endDate: string;
  category: Category;
  type: string;
  expected_spending: string;
  payment_type: string;
  exclude: boolean;
}

/**
 * 해당 일의 일정을 받아 카테고리 수별로 마커위치를 고정하기 위해 새로운 배열을 생성해 반환하는 함수
 * @param {Array} daySchedules 해당 일의 일정 배열
 * @returns {Array} 카테고리별 일정 마커를 표시하기 휘한 길이 7의 배열 (색상 표시를 위해 color 요소 필수)
 */
export const makeMarkerData = (
  daySchedules: DaySchedulesInterface[],
  isDarkMode: boolean
) => {
  const emptyData = Array(6)
    .fill(undefined)
    .map(() => ({ color: isDarkMode ? "#12293b" : "#FFFFFF" }));
  const categoryForMarker = INCOME.nested
    .concat(EXPENDITURE.nested)
    .filter(
      (c) =>
        daySchedules.findIndex(
          (s: DaySchedulesInterface) => s.category?.nestedType === c.type
        ) !== -1
    );

  switch (categoryForMarker.length) {
    case 1:
      return [emptyData[0], ...categoryForMarker, ...emptyData.slice(-5)];
    case 2:
      return [...emptyData.slice(-4), ...categoryForMarker, emptyData[0]];
    case 3:
      return [...categoryForMarker, ...emptyData.slice(-4)];
    case 4:
      return [...emptyData.slice(-3), ...categoryForMarker];
    case 5:
      return [
        ...categoryForMarker.slice(0, 3),
        emptyData[0],
        ...categoryForMarker.slice(-2),
        emptyData[0],
      ];
    case 6:
      return [
        categoryForMarker[0],
        emptyData[0],
        ...categoryForMarker.slice(1),
      ];
    default:
      return categoryForMarker;
  }
};
