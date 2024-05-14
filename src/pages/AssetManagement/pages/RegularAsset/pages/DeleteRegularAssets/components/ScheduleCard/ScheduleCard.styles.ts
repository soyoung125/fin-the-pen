import styled from "@emotion/styled";

export const CardContainer = styled.div<{ $isSelected: boolean }>`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  border: ${({ $isSelected }) =>
    $isSelected ? "1px solid #735BF2" : "1px solid #c8cbd0"};
  background: #fff;
`;

export const IndexBox = styled.div<{ $isSelected: boolean }>`
  display: flex;
  padding: 4px 11px;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  border: ${({ $isSelected }) =>
    $isSelected ? "1px solid #735BF2" : "1px solid #c8cbd0"};
  color: ${({ $isSelected }) => ($isSelected ? "#FFF" : "#c8cbd0")};
  background: ${({ $isSelected }) => ($isSelected ? "#735BF2" : "#FFF")};
`;
