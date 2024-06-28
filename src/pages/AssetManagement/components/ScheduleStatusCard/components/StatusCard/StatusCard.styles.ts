import styled from "@emotion/styled";

export const CardContainer = styled.div`
  display: flex;
  padding-bottom: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex: 1 0 0;

  border-radius: 4px;
  border: 1px solid #c8cbd0;
`;

export const CardHeader = styled.div`
  display: flex;
  padding: 7px 20px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  background-color: #735bf2;

  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px; /* 157.143% */
  letter-spacing: 0.4px;
`;

export const CardBody = styled.div`
  color: #735bf2;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px; /* 133.333% */
`;
