import { VictoryPie } from "victory";

const PieChart = () => {
  return (
    <div className="charts">
      <VictoryPie
        data={[
          { x: "value1", y: 20 },
          { x: "value2", y: 40 },
          { x: "value3", y: 5 },
        ]}
      />
    </div>
  );
};

export default PieChart;
