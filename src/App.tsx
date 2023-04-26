import "./App.css";
import { useEffect, useState, useCallback } from "react";
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

const PAGE_SIZE = 10;
const App = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [data, setData] = useState<DataRow[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  console.log(totalCount);
  const API_BASE_URL = "https://data.cityofnewyork.us";
  const API_ROUTES = {
    data: `/resource/xnfm-u3k5.json?$limit=${PAGE_SIZE}&$offset=${currentPage}`,
    columns: "/api/views/xnfm-u3k5.json",
  };

  const fetchTableData = useCallback(async () => {
    try {
      const [dataResponse, columnsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}${API_ROUTES.data}`),
        axios.get(`${API_BASE_URL}${API_ROUTES.columns}`),
      ]);
      setData(dataResponse.data);
      setColumns(columnsResponse.data.columns);
      setTotalCount(columnsResponse.data.columns[0].cachedContents.count);
    } catch (error) {
      console.log(error);
    }
  }, [API_BASE_URL, API_ROUTES.data, API_ROUTES.columns]);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  const filteredData = data.filter((row) =>
    Object.keys(row).some(
      (key) =>
        key === selectedColumn &&
        row[key] &&
        row[key].toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

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
        <TableFC
          PAGE_SIZE={PAGE_SIZE}
          columns={columns}
          data={data}
          totalCount={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          selectedColumn={selectedColumn}
          setSelectedColumn={setSelectedColumn}
          setSearchText={setSearchText}
          searchText={searchText}
          filteredData={filteredData}
        />
      </Row>
    </Container>
  );
};

export default App;
