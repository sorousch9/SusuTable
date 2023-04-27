import "./App.css";
import { useEffect, useState, useCallback, useMemo } from "react";
import TableFC from "./components/Table";
import DataSelection from "./components/DataSelection";
import NavChart from "./components/NavChart";
import { Container, Col, Row, Form } from "react-bootstrap";
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
  dataTypeName: string;
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
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [minValue, setMinValue] = useState<number | undefined>();
  const [maxValue, setMaxValue] = useState<number | undefined>();

  const API_BASE_URL = "https://data.cityofnewyork.us";
  const API_ROUTES = useMemo(() => {
    let route = `/id/xnfm-u3k5.json?$limit=${PAGE_SIZE}&$offset=${currentPage}`;
    let countRoute = `/id/xnfm-u3k5.json?$select=count(*) as __count_alias__`;
    if (selectedColumn && searchText) {
      const searchClause = `&$where=(upper(${selectedColumn}) LIKE '%25${searchText}%25')`;
      route += searchClause;
      countRoute += searchClause;
    }
    if (minValue !== undefined && maxValue !== undefined) {
      const rangeClause = `&$where=(${selectedColumn} >= ${minValue} AND ${selectedColumn} <= ${maxValue})`;
      route += rangeClause;
      countRoute += rangeClause;
    } else if (minValue !== undefined) {
      const rangeClause = `&$where=(${selectedColumn} >= ${minValue})`;
      route += rangeClause;
      countRoute += rangeClause;
    } else if (maxValue !== undefined) {
      const rangeClause = `&$where=(${selectedColumn} <= ${maxValue})`;
      route += rangeClause;
      countRoute += rangeClause;
    }
    console.log(route);
    return {
      data: route,
      count: countRoute,
      columns: "/api/views/xnfm-u3k5.json",
    };
  }, [currentPage, selectedColumn, searchText, minValue, maxValue]);
  const fetchTableData = useCallback(async () => {
    try {
      const [dataResponse, countResponse, columnsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}${API_ROUTES.data}`),
        axios.get(`${API_BASE_URL}${API_ROUTES.count}`),
        axios.get(`${API_BASE_URL}${API_ROUTES.columns}`),
      ]);
      setData(dataResponse.data);
      setColumns(columnsResponse.data.columns);
      setTotalCount(countResponse.data[0].__count_alias__);
    } catch (error) {
      console.log(error);
    }
  }, [API_BASE_URL, API_ROUTES.data, API_ROUTES.count, API_ROUTES.columns]);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

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
          minValue={minValue}
          setMinValue={setMinValue}
          maxValue={maxValue}
          setMaxValue={setMaxValue}
        />
      </Row>
    </Container>
  );
};

export default App;
