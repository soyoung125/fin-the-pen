import styled from "@emotion/styled";

export const DrawerBodyContainer = styled.div`
  margin: 24px 20px;
  flex-grow: 1;
`;

export const DrawerBodyItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 89px;
  height: 50px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1.4px solid #735bf2;
  color: #735bf2;
`;

export const ItemInput = styled.input`
  display: flex;
  height: 50px;
  padding: 8px 12px;
  flex-grow: 1;
  border-radius: 4px;
  border: 1px solid #a9acb2;
  outline: none;
  text-align: end;
`;
