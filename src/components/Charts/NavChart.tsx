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
import { BiScatterChart } from "react-icons/bi";

const NavChart = () => (
  <div className="navContent">
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Area Chart</Tooltip>}>
      <NavLink
        to={"/areaChart"}
        className="navIcons"
      >
        <FcAreaChart />
      </NavLink>
    </OverlayTrigger>

    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>Scatter Chart </Tooltip>}
    >
      <NavLink
        to={"/scatterChart"}
        className="navIcons"
      >
        <BiScatterChart />
      </NavLink>
    </OverlayTrigger>
    
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Pie Chart</Tooltip>}>
      <NavLink
        to={"/pieChart"}
        className="navIcons"
      >
        <FcDoughnutChart />
      </NavLink>
    </OverlayTrigger>

    <OverlayTrigger placement="bottom" overlay={<Tooltip>Line Chart</Tooltip>}>
      <NavLink to={"/"} className="navIcons">
        <FcLineChart />
      </NavLink>
    </OverlayTrigger>

    <OverlayTrigger placement="bottom" overlay={<Tooltip>Bar Chart </Tooltip>}>
      <NavLink
        to={"/barChart"}
        className="navIcons"
      >
        <FcBarChart />
      </NavLink>
    </OverlayTrigger>
       
    <OverlayTrigger  placement="bottom"  overlay={<Tooltip>Histogram</Tooltip>}>
      <NavLink
        to={"/histogram"}
        className="navIcons"
      >
        <FcComboChart />
      </NavLink>
    </OverlayTrigger>
  </div>
);

export default NavChart;
