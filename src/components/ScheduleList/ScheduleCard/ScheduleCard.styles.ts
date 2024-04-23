import styled from "@emotion/styled";

export const AmountComponent = styled.div<{
  $isPredict?: boolean;
}>`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
  color: #43464c;
  background: ${({ $isPredict }) => ($isPredict ? "#DEE0E3" : "#fff")};
  padding: 2px 4px;
  border-radius: 100px;
`;

export const AmountType = styled.div<{
  $isPredict?: boolean;
  $isSpend: boolean;
}>`
  padding-right: 2px;
  color: ${({ $isPredict, $isSpend }) =>
    $isPredict ? "#43464c" : $isSpend ? "#F26969" : "#0075FF"};
`;
