import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DataProps } from "../../../types/chartsTypes";

function ScatterChartE({ dataPoints }: DataProps) {
  return (
    <div className="charts">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />

          <XAxis dataKey="dimension" name="X-axis" />
          <YAxis dataKey="measure" name="Y-axis" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={dataPoints} fill="#8884d8" shape="cross" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ScatterChartE;
