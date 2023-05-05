import { useState, FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import PeiChartE from "./Charts/PieChart";
import LineChartE from "./Charts/LineChart";
import AreaChartE from "./Charts/AreaChart";
import BarChartE from "./Charts/BarChart";
import Histogram from "./Charts/Histogram";
import NavChart from "./Charts/NavChart";
import Menu from "./Charts/Menu";
import { ChartDataPoint, DataItem } from "../../types/chartsTypes";
import { PropsColumns } from "../../types/tableTypes";
import ScatterChartE from "./Charts/ScatterChart";

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
    <Container>
      <Row>
        <Col xs={9}>
          <NavChart />
          <Routes>
            <Route
              path="/pieChart"
              element={<PeiChartE dataPoints={dataPoints} />}
            />
            <Route
              path="/scatterChart"
              element={<ScatterChartE dataPoints={dataPoints} />}
            />
            <Route path="/" element={<LineChartE dataPoints={dataPoints} />} />
            <Route
              path="/areaChart"
              element={<AreaChartE dataPoints={dataPoints} />}
            />
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
    </Container>
  );
};
export default Charts;
