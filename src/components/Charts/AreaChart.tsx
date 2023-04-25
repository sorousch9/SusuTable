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
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 7 },
            ]}
          />
          <VictoryArea
            style={{
              data: { fill: "black", stroke: "gray" },
            }}
            data={[
              { x: 1, y: 3 },
              { x: 2, y: 2 },
              { x: 3, y: 6 },
              { x: 4, y: 2 },
              { x: 5, y: 6 },
            ]}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};

export default AreaChart;
