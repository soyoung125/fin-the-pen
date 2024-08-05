import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const TextBox = styled.div<{ $isCenter: boolean }>`
  text-align: ${({ $isCenter }) => ($isCenter ? "center" : "left")};
  padding: 10px 10px 5px 10px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
`;

export const ArrowIcon = styled.img`
  position: relative;
  left: 30px;
  height: 12px;
  width: 14px;
`;
