import { useState, FC } from "react";
import { Route, Routes } from "react-router-dom";
import NavChart from "./NavChart";
import Menu from "./Menu";
import { ChartDataPoint } from "../../../types/chartsTypes";
import { PropsColumns } from "../../../types/tableTypes";
import PeiChartE from "./Charts/PieChart";
import ScatterChartE from "./Charts/ScatterChart";
import LineChartE from "./Charts/LineChart";
import AreaChartE from "./Charts/AreaChart";
import BarChartE from "./Charts/BarChart";
import Histogram from "./Charts/Histogram";
import "./chart.css";
interface DataItem {
  [key: string]: string | number;
}

const Charts: FC<PropsColumns> = ({ columns }) => {
  const [axlesData, setAxlesData] = useState<DataItem[]>([]);
  const dataPoints: ChartDataPoint[] = axlesData
    .filter(
      ({ __dimension_alias__, __measure_alias__ }) =>
        __dimension_alias__ && __measure_alias__
    )
    .map(({ __dimension_alias__, __measure_alias__ }) => ({
      dimension: String(__dimension_alias__),
      measure: Number(__measure_alias__),
    }));

  return (
    <div className="chartsContainer">
      <div className="navChartContainer">
        <NavChart />
      </div>
      <div className="chartsWrapper">
        <Routes>
          <Route
            path="/lineChart"
            element={<LineChartE dataPoints={dataPoints} />}
          />
          <Route
            path="/piechart"
            element={<PeiChartE dataPoints={dataPoints} />}
          />
          <Route
            path="/scatterChart"
            element={<ScatterChartE dataPoints={dataPoints} />}
          />
          <Route
            path="/areaChart"
            element={<AreaChartE dataPoints={dataPoints} />}
          />
          <Route
            path="/barChart"
            element={<BarChartE dataPoints={dataPoints} />}
          />
          <Route path="/" element={<Histogram dataPoints={dataPoints} />} />
        </Routes>
      </div>
      <div className="menuContainer">
        <Menu setAxlesData={setAxlesData} columns={columns} />
      </div>
    </div>
  );
};

export default Charts;
