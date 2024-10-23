import styled from "@emotion/styled";
import { Bubble } from "./BubbleChart.tsx";

export const BubbleChartContainer = styled.div<{ $isBordered?: boolean }>`
  ${({ $isBordered }) => $isBordered && `border: 1px solid #e6e6e6;`}
  width: calc(100vw - 72px);
  max-width: 408px;
  height: calc(100vw - 72px);
  max-height: 408px;
  position: relative;
`;

export const BubbleComponent = styled.div<{
  $x: Bubble["x"];
  $y: Bubble["y"];
  $r: Bubble["r"];
  $color: Bubble["color"];
  $background: Bubble["background"];
}>`
  position: absolute;
  color: ${({ $color }) => $color ?? "#000"};
  background: ${({ $background }) => $background ?? "#e6e6e6"};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: keep-all;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  width: ${({ $r }) => $r}%;
  height: ${({ $r }) => $r}%;
`;
