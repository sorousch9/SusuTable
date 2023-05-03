import { FC } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import { DataProps } from "../../../types/charts";

interface ChartDataPoint {
  x: string | number;
  label: string | number;
  y: number;
}

const LineChart: FC<DataProps> = ({ axlesData }) => {
  const dataPoints: ChartDataPoint[] = axlesData
    .filter(
      ({ __dimension_alias__, __measure_alias__ }) =>
        __dimension_alias__ && __measure_alias__
    )
    .map(({ __dimension_alias__, __measure_alias__ }) => ({
      x: String(__dimension_alias__),
      y: Number(__measure_alias__),
      label: `${__measure_alias__}, ${__dimension_alias__}`,
    }));

  return (
    <div className="charts">
      <VictoryChart
        theme={VictoryTheme.material}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        width={800}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryLine
          labelComponent={<VictoryTooltip />}
          data={dataPoints}
          interpolation="step"
          x={""}
        />
      </VictoryChart>
    </div>
  );
};

export default LineChart;
