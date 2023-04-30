import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  FcAreaChart,
  FcBarChart,
  FcComboChart,
  FcDoughnutChart,
  FcLineChart,
} from "react-icons/fc";
import { NavLink } from "react-router-dom";
import "./navChart.css";

const NavChart = () => (
  <div className="navContent">
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Area Chart</Tooltip>}>
      <NavLink
        to={"/areaChart"}
        className=" d-inline-flex align-items-center navIcons"
      >
        <FcAreaChart />
      </NavLink>
    </OverlayTrigger>

    <OverlayTrigger placement="bottom" overlay={<Tooltip>Pie Chart</Tooltip>}>
      <NavLink to={"/"} className="navIcons d-inline-flex align-items-center">
        <FcDoughnutChart />
      </NavLink>
    </OverlayTrigger>

    <OverlayTrigger placement="bottom" overlay={<Tooltip>Line Chart</Tooltip>}>
      <NavLink
        to={"/lineChart"}
        className="navIcons d-inline-flex align-items-center"
      >
        <FcLineChart />
      </NavLink>
    </OverlayTrigger>

    <OverlayTrigger placement="bottom" overlay={<Tooltip>Bar Chart </Tooltip>}>
      <NavLink
        to={"/barChart"}
        className="navIcons d-inline-flex align-items-center"
      >
        <FcBarChart />
      </NavLink>
    </OverlayTrigger>
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Histogram</Tooltip>}>
      <NavLink
        to={"/histogram"}
        className="navIcons d-inline-flex align-items-center"
      >
        <FcComboChart />
      </NavLink>
    </OverlayTrigger>
  </div>
);

export default NavChart;
