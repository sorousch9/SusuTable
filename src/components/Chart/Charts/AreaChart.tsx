import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { FC } from "react";
import { DataProps } from "../../../../types/chartsTypes";

const AreaChartE: FC<DataProps> = ({ dataPoints }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={dataPoints}
        margin={{
          left: 20,
          top: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dimension" name="X-axis" />
        <YAxis name="Y-axis" />
        <Tooltip />
        <Area type="basis" dataKey="measure" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartE;
