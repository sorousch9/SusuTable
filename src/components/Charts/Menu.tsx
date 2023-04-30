import "./menu.css";
import { useState } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { TfiHelpAlt } from "react-icons/tfi";
import { Form, InputGroup } from "react-bootstrap";

const Menu = () => {
  const [dimension, setDimension] = useState("");
  const [measure, setMeasure] = useState("");

  const handleChangeDimension = (event: any) => {
    setDimension(event.target.value);
  };
  const handleChangeMeasure = (event: any) => {
    setMeasure(event.target.value);
  };

  return (
    <div>
      <OverlayTrigger
        overlay={
          <Tooltip>
            A dimension is a field that orders, groups, or categorizes your
            data, such as dates and categories. The dimension is often shown on
            the x-axis or as points on a map.
          </Tooltip>
        }
      >
        <h4>
          Dimension <TfiHelpAlt size={"1rem"} />
        </h4>
      </OverlayTrigger>
      <Form>
        <InputGroup>
          <Form.Select value={dimension} onChange={handleChangeDimension}>
            <option value={1}>Date</option>
          </Form.Select>
        </InputGroup>
      </Form>
      <OverlayTrigger
        overlay={
          <Tooltip>
            A measure is a numeric field or the count of rows associated with
            the selected dimension.
          </Tooltip>
        }
      >
        <h4>
          Measure <TfiHelpAlt size={"1rem"} />
        </h4>
      </OverlayTrigger>
      <Form>
        <InputGroup>
          <Form.Select value={measure} onChange={handleChangeMeasure}>
            <option value={1}>Community Board</option>
          </Form.Select>
        </InputGroup>
      </Form>
    </div>
  );
};

export default Menu;
