import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { DataProps } from "../../../types/chartsTypes";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#45643F"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
function PeiChartE({ dataPoints }: DataProps) {
  return (
    <div className="charts">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dataPoints.slice(0, 9)}
     
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={180}
            innerRadius={60}
            fill="#8884d8"
            dataKey="measure"
          >
            {dataPoints.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
export default PeiChartE;
