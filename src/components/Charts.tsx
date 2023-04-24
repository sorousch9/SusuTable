import { VictoryPie } from "victory";

const Charts = () => {
  return (
    <div style={{ height: "50vh" }}>
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

export default Charts;
