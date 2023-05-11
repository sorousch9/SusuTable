import { FC } from "react";
import { Row } from "react-bootstrap";
import "./content.css";
import Charts from "./Chart/Charts";
import { PropsColumns } from "../../types/tableTypes";
import Map from "./Map/Map";
import { Route, Routes, Link } from "react-router-dom";
import map from "../assets/map.webp";
import chart from "../assets/chart.webp";

const Content: FC<PropsColumns> = ({ columns }) => {
  return (
    <Row>
      <div className="navigationContainer">
        <Link to="/chart">
          <img src={chart} alt="Chart" className="navigationLinksIcon" />
        </Link>
        <Link to="/">
          <img src={map} alt="Map" className="navigationLinksIcon" />
        </Link>
      </div>

      <div className="contentWrapper">
        <Routes>
          <Route path="/chart/*" element={<Charts columns={columns} />} />
          <Route path="/" element={<Map />} />
        </Routes>
      </div>
    </Row>
  );
};

export default Content;
