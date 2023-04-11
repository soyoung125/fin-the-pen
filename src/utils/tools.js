/* eslint-disable import/prefer-default-export */

import { EXPENDITURE } from '../domain/constants/categories';
import { deleteSchedule } from './redux/schedule/scheduleSlice';

/**
 * 유용한 함수들을 모아두는 곳.
 * 주석으로 부가 설명이 있으면 더 좋을 것 같아요.
 */

/**
 * isObjectValuesEmpty(obj)
 * 어떤 객체의 value 를 전수조사하여, 빈칸 '' 이 검출되지 않으면 -1을 반환하는 함수.
 * 즉, -1이 반환되면 이 객체의 value에 빈칸이 없다는 의미이다.
 */
export const isObjectValuesEmpty = (obj) => (
  Object.values(obj).findIndex((v) => v === '')
);

/**
  * 수입, 지출액을 계산하기 위한 함수
  * @param {Moment} baseDate 수입, 지출액을 계산할 기준일
  * @param {String} unit 'day', 'week', 'month' 같은 날/주/월을 확인하기 위한 단위
  * @param {Sting} type '-', '+' 수입/지출을 확인하기 위한 매개변수
  * @returns 일/주/월별 수입/지출 액
  */
export const calculateIncomeExpenditure = (schedules, baseDate, unit, type) => {
  let result = 0;
  if (type === '-') {
    result = schedules.filter((s) => baseDate.isSame(s.date, unit))
      .reduce((sum, current) => (
        current.type === type
          ? sum - parseInt(current.expected_spending, 10)
          : sum
      ), result);
  } else {
    result = schedules.filter((s) => baseDate.isSame(s.date, unit))
      .reduce((sum, current) => (
        current.type === type
          ? sum + parseInt(current.expected_spending, 10)
          : sum
      ), result);
  }
  return Math.abs(result).toLocaleString('ko-KR');
};

/**
 * geustMode 여부에 따라 실행할 함수를 결정하는 스위치
 *
 * @param {boolean} guestMode 게스트 모드 여부
 * @param {function} func1 게스트 모드인 경우 실행할 함수
 * @param {function} func2 게스트 모드가 아닌 경우 실행할 함수
 */

export const executeFunctionByGuestMode = (guestMode, func1, func2) => {
  if (guestMode) {
    func1();
  } else {
    func2();
  }
};

/**
 * 시작 시각이 종료 시각보다 빠른지 검사하는 함수.
 * 알파벳 순으로 검사하므로 시각('HH:MM'), 날짜('YYYY.MM.DD')를 범용 지원한다.
 * @param {*} startTime
 * @param {*} endTime
 * @returns
 */
export const isTimeOrderCorrect = (startTime, endTime) => {
  if (startTime > endTime) {
    return false;
  }
  return true;
};

export const deleteSelectedSchedule = (dispatch, schedule, handleClose) => {
  if (window.confirm('정말로 삭제 하시겠습니까?')) {
    console.log(schedule.id);
    dispatch(deleteSchedule(schedule.id));
    handleClose();
  }
};

export const initAssetsByCategory = () => EXPENDITURE.nested
  .map((category) => ({
    ...category,
    categories: category.categories.map((c) => ({ title: c, asset: '-' })),
    total: '-',
  }));
