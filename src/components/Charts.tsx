import React, { useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { TfiHelpAlt } from "react-icons/tfi";
import { Route, Routes } from "react-router-dom";
import PieChart from "./Charts/PieChart";
import LineChart from "./Charts/LineChart";
import AreaChart from "./Charts/AreaChart";
import BarChart from "./Charts/BarChart";
import Histogram from "./Charts/Histogram";
import NavChart from "./NavChart";
export default function Charts() {
  const [dimension, setDimension] = useState("");
  const [measure, setMeasure] = useState("");

  const handleChangeDimension = (event: any) => {
    setDimension(event.target.value);
  };
  const handleChangeMeasure = (event: any) => {
    setMeasure(event.target.value);
  };

  return (
    <Container>
      <Row>
        <Col xs={9}>
        <NavChart/>
          <Routes>
            <Route path="/" element={<PieChart />} />
            <Route path="/lineChart" element={<LineChart />} />
            <Route path="/areaChart" element={<AreaChart />} />
            <Route path="/barChart" element={<BarChart />} />
            <Route path="/histogram" element={<Histogram />} />
          </Routes>
        </Col>
        <Col xs={3}>
          <OverlayTrigger
            overlay={
              <Tooltip>
                A dimension is a field that orders, groups, or categorizes your
                data, such as dates and categories. The dimension is often shown
                on the x-axis or as points on a map.
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
                A measure is a numeric field or the count of rows associated
                with the selected dimension.
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
        </Col>
      </Row>
    </Container>
  );
}
