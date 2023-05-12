import { FC } from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";
import { DataProps } from "../../../../types/chartsTypes";

const Histogram: FC<DataProps> = ({ dataPoints }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={dataPoints}
        margin={{
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dimension" />
        <YAxis dataKey="measure" />
        <Tooltip />
        <Bar dataKey="measure" fill="#d9dad7" barSize={20} />
        <Line
          type="basisClosed"
          dataKey="measure"
          stroke="#c24d2c"
          activeDot={{ r: 8 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
export default Histogram;
