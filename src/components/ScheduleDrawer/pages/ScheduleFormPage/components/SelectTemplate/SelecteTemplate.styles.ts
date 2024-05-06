import styled from "@emotion/styled";

export const TemplateBadge = styled.div<{ $selected: boolean }>`
  display: flex;
  padding: 7px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ $selected }) => ($selected ? "#FFF" : "#8C919C")};
  background-color: ${({ $selected }) => ($selected ? "#735BF2" : "#DEE0E3")};
`;
