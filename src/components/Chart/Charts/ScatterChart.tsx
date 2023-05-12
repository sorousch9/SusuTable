import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DataProps } from "../../../../types/chartsTypes";

function ScatterChartE({ dataPoints }: DataProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />

        <XAxis dataKey="dimension" name="X-axis" />
        <YAxis dataKey="measure" name="Y-axis" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={dataPoints} fill="#8884d8" shape="circle" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default ScatterChartE;
