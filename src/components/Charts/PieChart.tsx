import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DataProps } from "../../../types/chartsTypes";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function PeiChartE({ dataPoints }: DataProps) {
  return (
    <div className="charts">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart >
          <Pie
            dataKey="y"
            isAnimationActive={true}
            data={dataPoints.slice(1,9)}
            
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {dataPoints.map((entry, x) => (
              <Cell
                key={`cell-${x}`}
                fill={COLORS[x % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PeiChartE;
