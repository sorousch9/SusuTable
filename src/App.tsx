import "./App.css";
import { useEffect, useState } from "react";
import TableFC from "./components/Table";
import DataSelection from "./components/DataSelection";
import NavChart from "./components/NavChart";
import { Container, Col, Row } from "react-bootstrap";
import PieChart from "./components/Charts/PieChart";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import LineChart from "./components/Charts/LineChart";
import AreaChart from "./components/Charts/AreaChart";
import BarChart from "./components/Charts/BarChart";
import Histogram from "./components/Charts/Histogram";

export interface Column {
  name: string;
  fieldName: string;
}

interface DataRow {
  [key: string]: string | number;
}

const API_BASE_URL = "https://data.cityofnewyork.us";

const API_ROUTES = {
  data: "/resource/xnfm-u3k5.json",
  columns: "/api/views/xnfm-u3k5.json",
};

function App() {
  //name:Header and fieldName:accessorKey
  const [columns, setColumns] = useState<Column[]>([]);
  const [data, setData] = useState<DataRow[]>([]);

  const fetchData = async () => {
    try {
      const [dataResponse, columnsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}${API_ROUTES.data}`),
        axios.get(`${API_BASE_URL}${API_ROUTES.columns}`),
      ]);
      setData(dataResponse.data);
      setColumns(columnsResponse.data.columns);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <TableFC columns={columns} data={data} />
      </Row>
    </Container>
  );
}

export default App;
