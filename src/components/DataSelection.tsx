import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { TfiHelpAlt } from "react-icons/tfi";
export default function DataSelection() {
  const [select1, setSelect1] = useState("");

  const handleChange = (event: any) => {
    setSelect1(event.target.value);
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
          <Form.Select value={select1} onChange={handleChange}>
            <option>Select</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
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
          <Form.Select value={select1} onChange={handleChange}>
            <option>Select</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </Form.Select>
        </InputGroup>
      </Form>
    </div>
  );
}
