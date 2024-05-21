import {
  BarChartContainer,
  BarComponent,
  BarLabelBox,
  BarLabelComponent,
  BarLabelContainer,
  LabelLine,
} from "@components/BarChart/BarChart.styles.ts";
import { Dispatch, SetStateAction } from "react";

export interface Bar {
  label: string;
  data: number;
  color: string;
}

export interface BarChartProps {
  values: string[];
  data: number[];
  titles: string[];
  colors: string[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

function BarChart({
  values,
  colors,
  titles,
  data,
  selected,
  setSelected,
}: BarChartProps) {
  return (
    <>
      <BarLabelContainer>
        {values.map(
          (v, idx) =>
            data[idx] !== 0 && (
              <BarLabelComponent
                key={v}
                $width={data[idx]}
                onClick={() => setSelected(v)}
              >
                <BarLabelBox $isSelected={selected === v} $width={data[idx]}>
                  {titles[idx]}
                </BarLabelBox>
                <LabelLine $isSelected={selected === v} />
              </BarLabelComponent>
            )
        )}
      </BarLabelContainer>
      <BarChartContainer>
        {data.map(
          (d, idx) =>
            d !== 0 && (
              <BarComponent
                key={idx}
                $color={colors[idx]}
                $width={d}
                onClick={() => setSelected(values[idx])}
              >
                {selected === values[idx] && `${d}%`}
              </BarComponent>
            )
        )}
      </BarChartContainer>
    </>
  );
}

export default BarChart;
