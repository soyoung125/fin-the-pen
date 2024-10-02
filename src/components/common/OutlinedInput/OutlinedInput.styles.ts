import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  height: 50px;
  padding: 8px 12px;
  align-items: center;
  align-self: stretch;

  gap: 4px;

  border-radius: 4px;
  border: 1px solid #a9acb2;

  :focus {
    color: #735bf2;
    border-color: #735bf2;
  }
`;

export const Input = styled.input`
  width: 100%;

  color: black;
  font-weight: 400;
  font-size: 16px;
  font-family: "Pretendard Variable", Pretendard, sans-serif;

  outline: none;
  border: none;

  ::placeholder {
    color: #8c919c;
  }
`;
