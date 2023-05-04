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
          width={800}
          height={400}
          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" name="X-axis" unit="unit" />
          <YAxis dataKey="y" name="Y-axis" unit="unit" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="Data" data={dataPoints} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ScatterChartE;
