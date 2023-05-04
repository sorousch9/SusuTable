import "./App.css";
import { useEffect, useState } from "react";
import TableAPI from "./components/Table";
import Charts from "./components/Charts";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import { Column } from "../types/tableTypes";

const App = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    axios
      .get("https://data.cityofnewyork.us/api/views/xnfm-u3k5.json")
      .then((response) => {
        setColumns(response.data.columns);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Container fluid>
      <Row>
        <Charts columns={columns} />
      </Row>
      <Row>
        <TableAPI columns={columns} setColumns={setColumns} />
      </Row>
    </Container>
  );
};

export default App;
