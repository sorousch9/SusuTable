import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";

import {
  FcAreaChart,
  FcBarChart,
  FcComboChart,
  FcDoughnutChart,
  FcFlowChart,
  FcLineChart,
  FcPieChart,
} from "react-icons/fc";
const NavChart = () => (
  <div className="navContent">
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Area Chart</Tooltip>}>
      <Button
        variant="light"
        className=" d-inline-flex align-items-center navIcons"
      >
        <FcAreaChart />
      </Button>
    </OverlayTrigger>

    <OverlayTrigger placement="bottom" overlay={<Tooltip>Pie Chart</Tooltip>}>
      <Button
        variant="light"
        className="navIcons d-inline-flex align-items-center"
      >
        <FcPieChart />
      </Button>
    </OverlayTrigger>

    <OverlayTrigger placement="bottom" overlay={<Tooltip>Line Chart</Tooltip>}>
      <Button
        variant="light"
        className="navIcons d-inline-flex align-items-center"
      >
        <FcLineChart />
      </Button>
    </OverlayTrigger>

    <OverlayTrigger placement="bottom" overlay={<Tooltip>Bar Chart </Tooltip>}>
      <Button
        variant="light"
        className="navIcons d-inline-flex align-items-center"
      >
        <FcBarChart />
      </Button>
    </OverlayTrigger>
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Combo Chart</Tooltip>}>
      <Button
        variant="light"
        className="navIcons d-inline-flex align-items-center"
      >
        <FcComboChart />
      </Button>
    </OverlayTrigger>
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>Doughnut Chart</Tooltip>}
    >
      <Button
        variant="light"
        className="navIcons d-inline-flex align-items-center"
      >
        <FcDoughnutChart />
      </Button>
    </OverlayTrigger>
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Flow Chart</Tooltip>}>
      <Button
        variant="light"
        className="navIcons d-inline-flex align-items-center"
      >
        <FcFlowChart />
      </Button>
    </OverlayTrigger>
  </div>
);

export default NavChart;
