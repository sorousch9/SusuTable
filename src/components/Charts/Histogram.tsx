import { VictoryChart, VictoryHistogram } from "victory";

const Histogram = () => {
  return (
    <div className="charts">
      <VictoryChart domainPadding={{ x: 20 }}>
        <VictoryHistogram
          style={{
            data: { fill: "#c43a31" },
          }}
          data={[{ x: 1 }, { x: 2 }, { x: 2 }, { x: 4 }, { x: 4 }, { x: 5 }]}
        />
      </VictoryChart>
    </div>
  );
};
export default Histogram;
