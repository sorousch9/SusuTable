import { Col, Container, Row } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import PieChart from "./Charts/PieChart";
import LineChart from "./Charts/LineChart";
import AreaChart from "./Charts/AreaChart";
import BarChart from "./Charts/BarChart";
import Histogram from "./Charts/Histogram";
import NavChart from "./Charts/NavChart";
import Menu from "./Charts/Menu";
export default function Charts() {
  return (
    <Container>
      <Row>
        <Col xs={9}>
          <NavChart />
          <Routes>
            <Route path="/" element={<PieChart />} />
            <Route path="/lineChart" element={<LineChart />} />
            <Route path="/areaChart" element={<AreaChart />} />
            <Route path="/barChart" element={<BarChart />} />
            <Route path="/histogram" element={<Histogram />} />
          </Routes>
        </Col>
        <Col xs={3}>
          <Menu />
        </Col>
      </Row>
    </Container>
  );
}
