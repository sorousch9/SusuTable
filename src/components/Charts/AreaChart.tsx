import { VictoryChart, VictoryGroup, VictoryArea } from "victory";

const AreaChart = () => {
  return (
    <div className="charts">
      <VictoryChart >
        <VictoryGroup
          style={{
            data: { strokeWidth: 3, fillOpacity: 0.4 },
          }}
        >
          <VictoryArea
            style={{
              data: { fill: "red", stroke: "red" },
            }}
            data={[
              { x: 1, y: Math.random() },
              { x: 2, y: Math.random() },
              { x: 3, y: Math.random() },
              { x: 4, y: Math.random() },
              { x: 5, y: Math.random() },
              { x: 6, y: Math.random() },
            ]}
          />
          <VictoryArea
            style={{
              data: { fill: "black", stroke: "gray" },
            }}
            data={[
              { x: 1, y: Math.random() },
              { x: 2, y: Math.random() },
              { x: 3, y: Math.random() },
              { x: 4, y: Math.random() },
              { x: 5, y: Math.random() },
              { x: 6, y: Math.random() },
            ]}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};

export default AreaChart;
