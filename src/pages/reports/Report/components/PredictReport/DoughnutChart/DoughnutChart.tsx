import { Doughnut, getElementAtEvent } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { OPTIONS } from "@pages/reports/Report/components/PredictReport/DoughnutChart/utils.ts";
import { useRef, MouseEvent, useEffect } from "react";
import * as React from "react";
import { LABELS } from "@pages/reports/Report/components/PredictReport/utils.ts";
import { Box } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface DoughnutChartProps {
  labels: string[];
  datas: number[];
  bgColors: string[];
  selected: string;
  setSelected?: React.Dispatch<React.SetStateAction<string>>;
}

function DoughnutChart({
  labels,
  datas,
  bgColors,
  selected,
  setSelected,
}: DoughnutChartProps) {
  const chartRef = useRef();
  const data = {
    labels: labels,
    datasets: [
      {
        label: "predict report",
        data: datas,
        backgroundColor: bgColors,
        borderWidth: 0,
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current;

    triggerTooltip(chart, LABELS.indexOf(selected));
  }, [selected]);

  function triggerTooltip(chart: ChartJS | undefined, index: number) {
    const tooltip = chart?.tooltip;

    if (!tooltip) {
      return;
    }

    tooltip.setActiveElements([{ datasetIndex: 0, index: index }], {
      x: 0,
      y: 0,
    });

    chart.update();
  }

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    if (chartRef.current) {
      const element = getElementAtEvent(chartRef.current, event);
      setSelected && setSelected(labels[element[0].index]);
    }
  };

  return (
    <Box px={5}>
      <Doughnut
        ref={chartRef}
        data={data}
        options={OPTIONS}
        onClick={onClick}
      />
    </Box>
  );
}

export default DoughnutChart;
