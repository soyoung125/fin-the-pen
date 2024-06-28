import styled from "@emotion/styled";

export const HeaderContainer = styled.div`
  padding: 24px 20px 12px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StackContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CategoryBadge = styled.div`
  display: flex;
  color: #5b5f67;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  letter-spacing: 0.4px;
`;

export const PeriodBox = styled.div`
  color: #8c919c;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px; /* 150% */
  letter-spacing: 0.4px;
`;

export const EventNameBox = styled.div`
  color: #43464c;
  font-size: 22px;
  font-weight: 700;
  line-height: 32px; /* 145.455% */
  letter-spacing: -0.3px;
`;

export const AmountBox = styled.div`
  color: #43464c;
  font-size: 22px;
  font-weight: 700;
  line-height: 32px; /* 145.455% */
  letter-spacing: -0.3px;
`;
