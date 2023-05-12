import { FC } from "react";
import "./content.css";
import Charts from "./Chart/Charts";
import { PropsColumns } from "../../types/tableTypes";
import Map from "./Map/Map";
import { Route, Routes } from "react-router-dom";

const Content: FC<PropsColumns> = ({ columns }) => {
  return (
    <div className="contentWrapper">
      <Routes>
        <Route path="/chart/*" element={<Charts columns={columns} />} />
        <Route path="/" element={<Map />} />
      </Routes>
    </div>
  );
};

export default Content;
