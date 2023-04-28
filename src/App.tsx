import "./App.css";
import { useEffect, useState, useCallback, useMemo } from "react";
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
  dataTypeName: string;
  cachedContents: {
    largest: string;
    smallest: string;
  };
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
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const API_BASE_URL = "https://data.cityofnewyork.us";

  const API_ROUTES = useMemo(() => {
    let dataRoute = `/id/xnfm-u3k5.json?$limit=${PAGE_SIZE}&$offset=${currentPage}`;
    let countRoute = `/id/xnfm-u3k5.json?$select=count(*) as __count_alias__`;

    // Add search clause if both selectedColumn and searchText exist
    if (selectedColumn && searchText) {
      const searchClause = `&$where=(upper(${selectedColumn}) LIKE '%25${searchText}%25')`;
      dataRoute += searchClause;
      countRoute += searchClause;
    }

    // Add range clause if either minValue or maxValue exist
    if (minValue !== 0 || maxValue !== 0) {
      let rangeClause = "&$where=(";
      if (minValue !== 0) {
        rangeClause += `${selectedColumn} >= ${minValue}`;
      }
      if (maxValue !== 0) {
        if (minValue !== 0) {
          rangeClause += ` AND `;
        }
        rangeClause += `${selectedColumn} <= ${maxValue}`;
      }
      rangeClause += ")";
      dataRoute += rangeClause;
      countRoute += rangeClause;
    }
    // Add date range clause if either startDate or endDate exist
    if (startDate && endDate) {
      let dateRangeClause = "&$where=(";
      if (startDate) {
        dateRangeClause += `${selectedColumn} >= '${startDate}'`;
      }
      if (endDate) {
        if (startDate) {
          dateRangeClause += ` AND `;
        }
        dateRangeClause += `${selectedColumn} <= '${endDate}'`;
      }
      dateRangeClause += ")";
      dataRoute += dateRangeClause;
      countRoute += dateRangeClause;
    }

    return {
      data: dataRoute,
      count: countRoute,
      columns: "/api/views/xnfm-u3k5.json?&$$read_from_nbe=true&$$version=2.1",
    };
  }, [currentPage, selectedColumn, searchText, minValue, maxValue, startDate, endDate]);

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
          startDate={startDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          endDate={endDate}
        />
      </Row>
    </Container>
  );
};

export default App;
