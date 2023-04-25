import { VictoryPie } from "victory";

const PieChart = () => {
  return (
    <div className="charts">
      <VictoryPie
        labelRadius={({ innerRadius }) =>
          typeof innerRadius === "number" ? innerRadius + 5 : 5
        }
        radius={({ datum }) => 50 + datum.y * 20}
        innerRadius={50}
        style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold" } }}
        data={[
          { x: 1, y: 2, label: "one" },
          { x: 2, y: 3, label: "two" },
          { x: 3, y: 5, label: "three" },
          { x: 1, y: 4, label: "four" },
        ]}
      />
    </div>
  );
};

export default PieChart;
