import { useState, FC } from "react";
import { Col, Row } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import NavChart from "./NavChart";
import Menu from "./Menu";
import { ChartDataPoint } from "../../../types/chartsTypes";
import { PropsColumns } from "../../../types/tableTypes";
import PeiChartE from "./Charts/PieChart";
import ScatterChartE from "./Charts/ScatterChart";
import LineChartE from "./Charts/LineChart";
import AreaChartE from "./Charts/AreaChart";
import BarChartE from "./Charts/BarChart";
import Histogram from "./Charts/Histogram";
interface DataItem {
  [key: string]: string | number;
}
const Charts: FC<PropsColumns> = ({ columns }) => {
  const [axlesData, setAxlesData] = useState<DataItem[]>([]);
  const dataPoints: ChartDataPoint[] = axlesData
    .filter(
      ({ __dimension_alias__, __measure_alias__ }) =>
        __dimension_alias__ && __measure_alias__
    )
    .map(({ __dimension_alias__, __measure_alias__ }) => ({
      dimension: String(__dimension_alias__),
      measure: Number(__measure_alias__),
    }));
  return (
    <Row>
      <Col xs={1} style={{ padding: "0px" }}>
        <NavChart />
      </Col>
      <Col xs={8}>
        <Routes>
          <Route
            path="/lineChart"
            element={<LineChartE dataPoints={dataPoints} />}
          />
          <Route
            path="/pieChart"
            element={<PeiChartE dataPoints={dataPoints} />}
          />
          <Route
            path="/scatterChart"
            element={<ScatterChartE dataPoints={dataPoints} />}
          />
          <Route path="/" element={<AreaChartE dataPoints={dataPoints} />} />
          <Route
            path="/barChart"
            element={<BarChartE dataPoints={dataPoints} />}
          />
          <Route
            path="/histogram"
            element={<Histogram dataPoints={dataPoints} />}
          />
        </Routes>
      </Col>
      <Col xs={3}>
        <Menu setAxlesData={setAxlesData} columns={columns} />
      </Col>
    </Row>
  );
};
export default Charts;
