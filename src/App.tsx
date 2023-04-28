import "./App.css";
import TableFC from "./components/Table";
import DataSelection from "./components/DataSelection";
import NavChart from "./components/NavChart";
import { Container, Col, Row } from "react-bootstrap";
import PieChart from "./components/Charts/PieChart";
import { Routes, Route } from "react-router-dom";
import LineChart from "./components/Charts/LineChart";
import AreaChart from "./components/Charts/AreaChart";
import BarChart from "./components/Charts/BarChart";
import Histogram from "./components/Charts/Histogram";

const App = () => {
  return (
    <Container fluid>
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
          <DataSelection />
        </Col>
      </Row>
      <Row>
        <TableFC />
      </Row>
    </Container>
  );
};

export default App;
