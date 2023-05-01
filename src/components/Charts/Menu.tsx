import { useState } from "react";
import { TfiHelpAlt } from "react-icons/tfi";
import "./menu.css";
import { Form, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dimension, setDimension] = useState("");
  const [measure, setMeasure] = useState("");

  const handleChangeDimension = (event: any) => {
    setDimension(event.target.value);
  };
  const handleChangeMeasure = (event: any) => {
    setMeasure(event.target.value);
  };

  const handleClick = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };

  const items = [
    {
      title: "Axles",
      content: (
        <>
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
        </>
      ),
    },
    {
      title: "Filters",
      content: (
        <>
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
        </>
      ),
    },
  ];
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <div
            className={`accordion-header ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {item.title}
          </div>
          <div
            className={`accordion-content ${
              activeIndex === index ? "active" : ""
            }`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
