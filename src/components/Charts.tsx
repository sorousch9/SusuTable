import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import PieChart from "./Charts/PieChart";
import LineChart from "./Charts/LineChart";
import AreaChart from "./Charts/AreaChart";
import BarChart from "./Charts/BarChart";
import Histogram from "./Charts/Histogram";
import NavChart from "./Charts/NavChart";
import Menu from "./Charts/Menu";
import { DataItem } from "../../types/charts";

export default function Charts() {
  const [axlesData, setAxlesData] = useState<DataItem[]>([]);

  return (
    <Container>
      <Row>
        <Col xs={9}>
          <NavChart />
          <Routes>
            <Route path="/pieChart" element={<PieChart />} />
            <Route path="/" element={<LineChart axlesData={axlesData}/>} />
            <Route path="/areaChart" element={<AreaChart />} />
            <Route path="/barChart" element={<BarChart />} />
            <Route path="/histogram" element={<Histogram />} />
          </Routes>
        </Col>
        <Col xs={3}>
          <Menu setAxlesData={setAxlesData} />
        </Col>
      </Row>
    </Container>
  );
}
