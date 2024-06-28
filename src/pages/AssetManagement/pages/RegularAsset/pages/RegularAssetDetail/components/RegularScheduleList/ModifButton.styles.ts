import styled from "@emotion/styled";

export const ModifyButtonContainer = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  padding: 6px 8px;
  justify-content: center;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
  border-radius: 999px;
  background: #735bf2;

  position: fixed;
  bottom: 24px;
  right: 16px;

  box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.05);
`;

export const ModifyContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;

  width: 100dvw;
  height: 80px;
  padding: 8px 20px 28px 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  border-top: 1px solid #dee0e3;
  background: #fff;

  /* bottom btn */
  box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.05);
`;

export const ModifyText = styled.div<{ $isDelete?: boolean }>`
  height: 24px;
  flex: 1 0 0;

  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px; /* 150% */
  letter-spacing: -0.1px;

  color: ${({ $isDelete }) => ($isDelete ? "#E82A2A" : "#0075FF")};
`;
