/**
 * 반드시 슬래시가 없는 상태로 끝내기
 */

export const DOMAIN = process.env.NODE_ENV === "production" ? "/api" : "/local"; // 로컬 서버와 연결할 때 (단, MSW 동작 시 로컬 서버로 요청이 나가지 않고 mocking 당할 수 있음)
