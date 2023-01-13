const ADD_SCHEDULE = Object.freeze({
  drawer_title: '새로운 이벤트',
  name: '제목',
  date: '날짜',
  start_time: '시작',
  end_time: '종료',
  repeat: '반복',
  repeating_cycle: '반복 주기',
  repeat_deadline: '반복 종료 기한',
  category_title: '일정 카테고리',
  add_category: '+ 카테고리 추가',
  set_finance_title: '자산 설정하기',
  set_spending_title: '금액 설정',
  type_plus: '+', // 수정금지
  type_minus: '-', // 수정금지
  won: '원',
  expected_spending: '예상 비용',
  set_importance_title: '일정 중요도',
  importance_high: '상', // 수정금지
  importance_middle: '중', // 수정금지
  importance_low: '하', // 수정금지
  exclusion_title: '예산에서 제외',
  add_schedule: '일정 추가하기',
});
const NEED_TITLE = '제목을 입력해야 합니다.';
const INIT_SCHEDULE = {
  event_name: '',
  alarm: false,
  date: new Date(),
  start_time: '09:00',
  end_time: '11:00',
  repeating_cycle: '없음',
  repeat_deadline: '없음',
  repeat_endDate: new Date(),
  category: {},
  type: ADD_SCHEDULE.type_minus,
  expected_spending: 0,
  importance: ADD_SCHEDULE.importance_middle,
  exclusion: false, // false면 포함
};
export default null;
export { ADD_SCHEDULE, NEED_TITLE, INIT_SCHEDULE };
