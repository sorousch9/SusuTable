import "./App.css";
import { useEffect, useState } from "react";
import TableFC from "./components/Table";
import DataSelection from "./components/DataSelection";
import NavChart from "./components/NavChart";
import { Container, Col, Row } from "react-bootstrap";
import Charts from "./components/Charts";
import axios from "axios";

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
          <Charts />
          <TableFC columns={columns} data={data} />
        </Col>
        <Col xs={3}>
          <DataSelection />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
