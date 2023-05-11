import "./App.css";
import { useEffect, useState } from "react";
import TableAPI from "./components/Table/Table";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import { Column } from "../types/tableTypes";
import Content from "./components/Content";
import Header from "./components/Header";
import { HeaderType } from "../types/headerType";

const App = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [appDescription, setAppDescription] = useState<HeaderType>();
  useEffect(() => {
    axios
      .get(
        "https://data.cityofnewyork.us/api/views/if26-z6xq.json?read_from_nbe=true&version=2.1"
      )
      .then((response) => {
        setColumns(response.data.columns);
        setAppDescription(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Container fluid>
      <Header appDescription={appDescription} />
      <Row>
        <Content columns={columns} />
      </Row>
      <Row>
        <TableAPI columns={columns} setColumns={setColumns} />
      </Row>
    </Container>
  );
};

export default App;
