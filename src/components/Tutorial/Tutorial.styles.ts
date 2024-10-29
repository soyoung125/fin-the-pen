import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100dvw;
  height: 100dvh;
  box-sizing: border-box;
  padding: 45px 0;
  mix-blend-mode: hard-light;
  background-color: rgba(19, 19, 19, 0.9);
  position: fixed;
  top: -0px;
  z-index: 5000;
`;

export const CloseTutorialBtnContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  max-width: 480px;
  margin: auto;
  right: 20px;
  color: #fff;
`;

export const TutorialContainer = styled.div`
  height: calc(100dvh - 90px - 32px);
  position: relative;
  margin: auto;
  max-width: 480px;
`;
