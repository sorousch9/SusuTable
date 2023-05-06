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
    <Container className="content">
      <Row>
        <Col xs={1} style={{ paddingRight: "0px" }}>
          <div className="navContent">
            <Link to="/">
              <img src={chart} alt="Chart" className="navIcon" />
            </Link>
            <Link to="/map">
              <img src={map} alt="Map" className="navIcon" />
            </Link>
          </div>
        </Col>
        <Col xs={11}>
          <div className="contentItem">
            <Routes>
              <Route path="/*" element={<Charts columns={columns} />} />
              <Route path="/map" element={<Map />} />
            </Routes>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Content;
