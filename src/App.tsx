import "./App.css";
import { useEffect, useState } from "react";
import TableFC from "./components/Table";
import DataSelection from "./components/DataSelection";
import NavChart from "./components/NavChart";
import { Container, Col, Row } from "react-bootstrap";
import Charts from "./components/Charts";

export interface Column {
  Header: string;
  accessor: string;
}

type Data = {
  [key: string]: string | number;
};

function App() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    fetch(
      "https://data.cityofnewyork.us/resource/xnfm-u3k5.json?$limit=100&$offset=0"
    )
      .then((response) => response.json())
      .then((data) => {
        const columnKeys = Object.keys(data[0]);

        // Convert array of strings to array of Column objects
        const columns = columnKeys.map((key) => ({
          Header: key,
          accessor: key.toLowerCase(),
        }));

        setData(data);
        setColumns(columns);
      });
  }, []);

  return (
    <Container>
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
