import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./content.css";
import Charts from "./Chart/Charts";
import { PropsColumns } from "../../types/tableTypes";
import Map from "./Map/Map";
import { Route, Routes, Link } from "react-router-dom";
import map from "../assets/map.webp";
import chart from "../assets/chart.webp";

const Content: FC<PropsColumns> = ({ columns }) => {
  return (
    <Container>
      <Row>
        <Col xs={1}>
          <div className="navContent">
            <Link to="/chart">
              <img src={chart} alt="Chart" className="navIcon" />
            </Link>
            <Link to="/">
              <img src={map} alt="Map" className="navIcon" />
            </Link>
          </div>
        </Col>
        <Col xs={11}>
          <div className="contentItem">
            <Routes>
              <Route path="/chart/*" element={<Charts columns={columns} />} />
              <Route path="/" element={<Map />} />
            </Routes>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Content;
