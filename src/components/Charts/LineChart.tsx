import { FC } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";
import { DataProps } from "../../../types/charts";

interface ChartDataPoint {
  x: string | number;
  y: number;
}

const LineChart: FC<DataProps> = ({ axlesData }) => {

  const dataPoints: ChartDataPoint[] = axlesData.map(
    ({ __dimension_alias__, __measure_alias__ }) => ({
      x: __dimension_alias__,
      y: Number(__measure_alias__),
    })
  );

  return (
    <div className="charts">
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine data={dataPoints} />
      </VictoryChart>
    </div>
  );
};

export default LineChart;
