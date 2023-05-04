import React, { Fragment, useEffect, useState, FC } from "react";
import { TfiHelpAlt } from "react-icons/tfi";
import "./menu.css";
import { Form, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import { DataStateProps } from "../../../types/chartsTypes";

const apiUrl = "https://data.cityofnewyork.us/api/id/xnfm-u3k5.json";
const Menu: FC<DataStateProps> = ({ setAxlesData, columns }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dimension, setDimension] = useState("boroughname");
  const [measure, setMeasure] = useState("communityboard");

  useEffect(() => {
    async function fetchData() {
      const query = `SELECT \`${dimension}\` AS __dimension_alias__, SUM(\`${measure}\`) AS __measure_alias__ GROUP BY \`${dimension}\` ORDER BY __measure_alias__ DESC NULL LAST LIMIT 1000`;
      const url = `${apiUrl}?$query=${encodeURIComponent(
        query
      )}&$$read_from_nbe=true&$$version=2.1`;

      try {
        const response = await axios.get(url);
        setAxlesData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (dimension && measure) {
      fetchData();
    }
  }, [dimension, measure, setAxlesData]);

  const handleChangeDimension = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDimension(event.target.value);
  };
  const handleChangeMeasure = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
        <Fragment>
          <div>
            <OverlayTrigger
              placement="left"
              overlay={
                <Tooltip>
                  A dimension is a field that orders, groups, or categorizes
                  your data, such as dates and categories. The dimension is
                  often shown on the x-axis or as points on a map.
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
                  {columns.map((col) => (
                    <option key={col.fieldName} value={col.fieldName}>
                      {col.name}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Form>
          </div>

          <div>
            <OverlayTrigger
              placement="left"
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
                  <option value="communityboard">Community Board</option>
                  <option value="workscheduleprojectlocationid">
                    Work Schedule Project Location
                  </option>
                </Form.Select>
              </InputGroup>
            </Form>
          </div>
        </Fragment>
      ),
    },
    {
      title: "Filters",
      content: (
        <>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat,
          iusto nesciunt? Iste consequuntur laudantium earum quisquam ut alias
          ab, odit animi illum officia? Repellendus quasi iure atque in, ipsum
          iste!
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

export default Menu;
