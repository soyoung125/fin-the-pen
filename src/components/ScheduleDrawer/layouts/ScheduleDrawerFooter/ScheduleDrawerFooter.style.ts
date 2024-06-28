import styled from "@emotion/styled";

export const FooterContainer = styled.div`
  position: fixed;
  width: 100dvw;
  bottom: 0;
  z-index: 1300;
`;

export const AutoSaveContainer = styled.div`
  display: flex;
  padding: 4px 20px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  opacity: 1;

  color: #8c919c;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  letter-spacing: 0.4px;
`;

export const ActionContainer = styled.div`
  background-color: white;
  padding-bottom: 28px;
`;
