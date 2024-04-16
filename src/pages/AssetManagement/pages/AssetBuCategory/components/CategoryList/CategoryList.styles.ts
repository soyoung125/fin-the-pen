import styled from "@emotion/styled";

export const UnderlinedInput = styled.input<{
  $color?: string;
}>`
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  text-align: end;
  text-decoration-line: underline;
  text-underline-offset: 2px;
  background-color: ${({ $color }) => ($color ? $color : "#FFF")};
`;

export const UnderlinedInputBox = styled.div`
  font-size: 16px;
  font-weight: 400;
`;
