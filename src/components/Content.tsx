import { FC } from "react";
import { Row } from "react-bootstrap";
import "./content.css";
import Charts from "./Chart/Charts";
import { PropsColumns } from "../../types/tableTypes";
import Map from "./Map/Map";
import { Route, Routes } from "react-router-dom";

const Content: FC<PropsColumns> = ({ columns }) => {
  return (
    <Row>
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
