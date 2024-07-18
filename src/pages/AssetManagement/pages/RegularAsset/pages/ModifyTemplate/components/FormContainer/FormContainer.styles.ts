import styled from "@emotion/styled";

export const FormContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

export const EventNameInput = styled.input`
  color: #131416;
  border: none;
  outline: none;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: -0.1px;
`;

export const CategoryContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const CategoryText = styled.div`
  flex-grow: 1;
  color: #131416;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: -0.1px;
`;
