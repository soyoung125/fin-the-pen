import styled from "@emotion/styled";

export const Container = styled.div<{
  $offset: number;
  $position: "top" | "bottom";
}>`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  white-space: pre-line;
  padding: 5px 30px;
  mix-blend-mode: normal;
  bottom: ${({ $position, $offset }) => $position === "top" && `${$offset}px`};
  top: ${({ $position, $offset }) => $position === "bottom" && `${$offset}px`};
`;

export const TextBox = styled.div<{ $isCenter: boolean }>`
  text-align: ${({ $isCenter }) => ($isCenter ? "center" : "left")};
  padding: 10px 10px 5px 10px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;

export const ArrowIconContainer = styled.div`
  //position: relative;
  display: flex;
  gap: 50%;
  justify-content: center;
`;

export const ArrowIcon = styled.img`
  position: relative;
  left: 30px;
  height: 12px;
  width: 14px;
`;
