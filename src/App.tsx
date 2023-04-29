import "./App.css";
import TableAPI from "./components/Table";
import Charts from "./components/Charts";
import { Container, Row } from "react-bootstrap";

const App = () => {
  return (
    <Container fluid>
      <Row>
        <Charts />
      </Row>
      <Row>
        <TableAPI />
      </Row>
    </Container>
  );
};

export default App;
