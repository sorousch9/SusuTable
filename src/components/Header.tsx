import "./header.css";
import logo from "../assets/logo.png";
import { PropsHeader } from "../../types/headerType";
import { NavLink } from "react-router-dom";
import map from "../assets/map.webp";
import chart from "../assets/chart.webp";

const Header = ({ appDescription }: PropsHeader) => {
  return (
    <header className="header">
      <div className="logoContainer">
        <NavLink to={"/"}>
          <img src={logo} alt="Logo" className="logo" />
        </NavLink>
      </div>
      <div className="description">
        <h1 className="appName">{appDescription?.name}</h1>
        <p className="appDescription">{appDescription?.metadata.rowLabel}</p>
      </div>
      <div className="navigationContainer">
        <NavLink to={"/chart"}>
          Charts <img src={chart} alt="Chart" className="navigationLinksIcon" />
        </NavLink>
        <NavLink to={"/"}>
          Map<img src={map} alt="Map" className="navigationLinksIcon" />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
