import "./header.css";
import logo from "../assets/logo.png";
import { PropsHeader } from "../../types/headerType";

const Header = ({ appDescription }: PropsHeader) => {
  return (
    <header className="header">
      <div className="logoContainer">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="description">
        <h1 className="appName">{appDescription?.name}</h1>
        <p className="appDescription">{appDescription?.metadata.rowLabel}</p>
      </div>
    </header>
  );
};

export default Header;
