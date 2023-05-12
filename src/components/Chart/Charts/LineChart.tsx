import { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DataProps } from "../../../../types/chartsTypes";

const LineChartE: FC<DataProps> = ({ dataPoints }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={dataPoints}
        margin={{
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dimension" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" />
        <Line
          type="basis"
          name="Dimension :X  Measure:Y"
          dataKey="measure"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartE;
