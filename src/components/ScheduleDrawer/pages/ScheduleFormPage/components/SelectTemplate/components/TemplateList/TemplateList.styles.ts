import styled from "@emotion/styled";

export const TemplateBadge = styled.div<{ $selected: boolean }>`
  display: flex;
  padding: 5px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ $selected }) => ($selected ? "#FFF" : "#8C919C")};
  background-color: ${({ $selected }) => ($selected ? "#735BF2" : "#DEE0E3")};
  cursor: context-menu;
`;

export const EmptyTemplateBadge = styled.span`
  padding: 5px 8px;
  border-radius: 20px;
  border: 1px solid #dee0e3;

  color: #8c919c;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px; /* 150% */
  letter-spacing: 0.4px;
  cursor: context-menu;
`;
