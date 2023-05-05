import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { DataProps } from "../../../types/chartsTypes";
import { FC } from "react";

const AreaChartE: FC<DataProps> = ({ dataPoints }) => {
  return (
    <div className="charts">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={dataPoints}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dimension" name="X-axis" />
          <YAxis name="Y-axis" />
          <Tooltip />
          <Area type="monotone" dataKey="measure" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartE;
