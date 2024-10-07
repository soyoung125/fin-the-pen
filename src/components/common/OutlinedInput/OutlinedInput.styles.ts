import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  align-items: center;

  height: 50px;

  border-radius: 4px;
  border: 1px solid #a9acb2;
  overflow: hidden;

  &:focus-within {
    color: #735bf2;
    border-color: #735bf2;
  }
`;

export const Input = styled.input`
  flex: 1;
  height: 100%;

  padding: 8px 12px;

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
