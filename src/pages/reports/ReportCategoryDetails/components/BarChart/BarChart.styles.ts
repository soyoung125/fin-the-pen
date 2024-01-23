import styled from "@emotion/styled";
import { Bar } from "@pages/reports/ReportCategoryDetails/components/BarChart/BarChart.tsx";

export const BarChartContainer = styled.div`
  height: 24px;
  border-radius: 4px;
  display: flex;
  overflow: hidden;
`;

export const BarComponent = styled.div<{
  $width: Bar["data"];
  $color: Bar["color"];
}>`
  width: ${({ $width }) => $width}%;
  height: 22px;
  color: #fff;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 12px;
  font-weight: 600;
  margin: auto;
  padding-right: 10px;
`;

export const BarLabelContainer = styled.div`
  display: flex;
  position: relative;
  top: 5px;
  z-index: 100;
`;

export const BarLabelComponent = styled.div<{
  $width: Bar["data"];
}>`
  //position: relative;
  width: ${({ $width }) => $width}%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const BarLabelBox = styled.div<{
  $isSelected: boolean;
}>`
  min-width: 24px;
  position: absolute;
  left: 50%;
  bottom: 6px;
  margin-left: -24px;
  padding: 3px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ $isSelected }) => ($isSelected ? "#fff" : "#131416")};
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#131416" : "#DEE0E3"};
`;

export const LabelLine = styled.div<{
  $isSelected: boolean;
}>`
  //position: absolute;
  margin: auto;
  height: 6px;
  border: 1px dashed
    ${({ $isSelected }) => ($isSelected ? "#131416" : "#A9ACB2")};
`;
