import { DataProps } from "../../../types/chartsTypes";
import { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Histogram: FC<DataProps> = ({ dataPoints }) => {
  return (
    <div className="charts">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataPoints}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" name="Bin" />
          <YAxis dataKey="y" name="Count" />
          <Tooltip />
          <Legend />
          <Bar dataKey="y" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Histogram;
