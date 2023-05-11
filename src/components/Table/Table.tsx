import { useEffect, useState, useMemo, FC } from "react";
import { OverlayTrigger, Table } from "react-bootstrap";
import "./table.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Popover from "react-bootstrap/Popover";
import { BsSortDownAlt } from "react-icons/bs";
import { BsSortUp } from "react-icons/bs";
import axios from "axios";
import { DataRow, PropsStateColumns, Value } from "../../../types/tableTypes";
import PaginationTable from "./Pagination";

const PAGE_SIZE = 10;
const TableAPI: FC<PropsStateColumns> = ({ columns, setColumns }) => {
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [data, setData] = useState<DataRow[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | string>("");
  const [inputSelectedColumn, setInputSelectedColumn] = useState({
    textValue: "",
    minValue: "",
    maxValue: "",
    startDate: "",
    endDate: "",
  });
  const [queryValue, setQueryValue] = useState<Value>({
    textValue: "",
    minValue: 0,
    maxValue: 0,
    startDate: "",
    endDate: "",
  });

  function handleSortChange(columnName: string, newSortOrder: "ASC" | "DESC") {
    setSelectedColumn(columnName);
    setSortOrder(newSortOrder);
  }
  const API_BASE_URL = "https://data.cityofnewyork.us";
  const API_ROUTES = useMemo(() => {
    let dataRoute = `/api/id/if26-z6xq.json?$limit=${PAGE_SIZE}&$offset=${currentPage}&$order=${selectedColumn} ${sortOrder}`;
    let countRoute = `/api/id/if26-z6xq.json?$select=count(*) as __count_alias__`;

    let searchClause = "$where=";
    let rangeClause = "";

    let dateRangeClause = "";
    if (inputSelectedColumn.textValue && queryValue.textValue) {
      searchClause += `(upper(%60${inputSelectedColumn.textValue}%60) LIKE '%25${queryValue.textValue}%25') `;
      handleSortChange(inputSelectedColumn.textValue, "ASC");
      if (
        queryValue.minValue !== 0 ||
        queryValue.maxValue !== 0 ||
        queryValue.startDate ||
        queryValue.endDate
      ) {
        searchClause += " AND ";
      }
    }

    if (queryValue.minValue !== 0 || queryValue.maxValue !== 0) {
      if (queryValue.minValue !== 0) {
        rangeClause += `${inputSelectedColumn.minValue} >= ${queryValue.minValue}`;
        handleSortChange(inputSelectedColumn.minValue, "ASC");
      }
      if (queryValue.maxValue !== 0) {
        if (queryValue.minValue !== 0) {
          rangeClause += ` AND `;
        }
        rangeClause += `${inputSelectedColumn.maxValue} <= ${queryValue.maxValue}`;

        handleSortChange(inputSelectedColumn.maxValue, "DESC");
      }

      searchClause += rangeClause;
      if (queryValue.startDate || queryValue.endDate) {
        searchClause += " AND ";
      }
    }

    if (queryValue.startDate || queryValue.endDate) {
      if (queryValue.startDate) {
        dateRangeClause += `${inputSelectedColumn.startDate} >= '${queryValue.startDate}'`;
        handleSortChange(inputSelectedColumn.startDate, "ASC");
      }
      if (queryValue.endDate) {
        if (queryValue.startDate) {
          dateRangeClause += ` AND `;
        }
        dateRangeClause += `${inputSelectedColumn.endDate} <= '${queryValue.endDate}'`;
        handleSortChange(inputSelectedColumn.endDate, "DESC");
      }
      searchClause += dateRangeClause;
    }

    if (searchClause) {
      searchClause = `&${searchClause}`;
      dataRoute += searchClause;
      countRoute += searchClause;
    }

    return {
      data: dataRoute,
      count: countRoute,
    };
  }, [
    currentPage,
    selectedColumn,
    inputSelectedColumn,
    sortOrder,
    queryValue.textValue,
    queryValue.minValue,
    queryValue.maxValue,
    queryValue.startDate,
    queryValue.endDate,
  ]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const [dataResponse, countResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}${API_ROUTES.data}`),
          axios.get(`${API_BASE_URL}${API_ROUTES.count}`),
        ]);
        setData(dataResponse.data);
        setTotalCount(countResponse.data[0].__count_alias__);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTableData();
  }, [API_ROUTES, sortOrder]);

  const HandleChangeValue = (key: keyof Value, value: Value[keyof Value]) => {
    setQueryValue((prevState) => ({ ...prevState, [key]: value }));
  };
  const HandleChangeColumns = (key: keyof Value, value: Value[keyof Value]) => {
    setInputSelectedColumn((prevState) => ({ ...prevState, [key]: value }));
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  return (
    <div className="tableSection">
      <Table className="table" responsive striped bordered hover>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.fieldName}>
                <OverlayTrigger
                  trigger="click"
                  placement="top"
                  overlay={
                    <Popover>
                      <Popover.Header as="h3">{column.name}</Popover.Header>
                      <Popover.Body as="div">
                        {column.dataTypeName === "text" ? (
                          <input
                            type="text"
                            placeholder="Search"
                            value={
                              inputSelectedColumn.textValue === column.fieldName
                                ? queryValue.textValue
                                : ""
                            }
                            onChange={(e) => {
                              HandleChangeColumns(
                                "textValue",
                                column.fieldName
                              );
                              HandleChangeValue(
                                "textValue",
                                e.target.value.toUpperCase()
                              );
                            }}
                          />
                        ) : column.dataTypeName === "number" ? (
                          <div>
                            <input
                              type="number"
                              placeholder="Min number"
                              min={column.cachedContents?.smallest}
                              max={column.cachedContents?.largest}
                              value={
                                inputSelectedColumn.minValue ===
                                column.fieldName
                                  ? Number(queryValue.minValue)
                                  : ""
                              }
                              onChange={(e) => {
                                HandleChangeColumns(
                                  "minValue",
                                  column.fieldName
                                );
                                HandleChangeValue(
                                  "minValue",
                                  Number(e.target.value)
                                );
                              }}
                            />
                            {" - "}
                            <input
                              type="number"
                              placeholder="Max number"
                              min={column.cachedContents?.smallest}
                              max={column.cachedContents?.largest}
                              value={
                                inputSelectedColumn.maxValue ===
                                column.fieldName
                                  ? Number(queryValue.maxValue)
                                  : ""
                              }
                              onChange={(e) => {
                                HandleChangeColumns(
                                  "maxValue",
                                  column.fieldName
                                );
                                HandleChangeValue(
                                  "maxValue",
                                  Number(e.target.value)
                                );
                              }}
                            />
                          </div>
                        ) : column.dataTypeName === "calendar_date" ? (
                          <div className="date-range-input">
                            <label>Start date:</label>
                            <input
                              type="date"
                              min={column.cachedContents?.smallest}
                              max={column.cachedContents?.largest}
                              value={
                                inputSelectedColumn.startDate ===
                                column.fieldName
                                  ? queryValue.startDate.toString()
                                  : ""
                              }
                              onChange={(e) => {
                                HandleChangeColumns(
                                  "startDate",
                                  column.fieldName
                                );
                                HandleChangeValue("startDate", e.target.value);
                              }}
                            />
                            <label>End date:</label>
                            <input
                              type="date"
                              min={column.cachedContents?.smallest}
                              max={column.cachedContents?.largest}
                              value={
                                inputSelectedColumn.endDate === column.fieldName
                                  ? queryValue.endDate.toString()
                                  : ""
                              }
                              onChange={(e) => {
                                HandleChangeColumns(
                                  "endDate",
                                  column.fieldName
                                );
                                HandleChangeValue("endDate", e.target.value);
                              }}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        <button
                          className="sortMenuBtn"
                          onClick={() => {
                            handleSortChange(column.fieldName, "ASC");
                          }}
                        >
                          <span className="sortMenuIco">
                            <BsSortUp size={"1.5rem"} />
                          </span>
                          <span className="sortMenuContent">
                            Sort Ascending
                          </span>
                        </button>
                        <button
                          className="sortMenuBtn"
                          onClick={() => {
                            handleSortChange(column.fieldName, "DESC");
                          }}
                        >
                          <BsSortDownAlt size={"1.5rem"} />
                          <span className="sortMenuContent">
                            Sort Decending
                          </span>
                        </button>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <button className="columnHeaderContent">
                    <span className="columnName">{column.name}</span>
                    <span className="columnBtn">
                      <BiDotsVerticalRounded />
                    </span>
                  </button>
                </OverlayTrigger>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <OverlayTrigger
                  key={columnIndex}
                  trigger={["hover", "focus"]}
                  placement="auto"
                  overlay={
                    <Popover>
                      <Popover.Body as="span">
                        {typeof row[column.fieldName] === "object"
                          ? JSON.stringify(row[column.fieldName])
                          : row[column.fieldName]}
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <td key={columnIndex}>
                    {/* Check if the value is an object */}
                    {typeof row[column.fieldName] === "object"
                      ? JSON.stringify(row[column.fieldName])
                      : row[column.fieldName]}
                  </td>
                </OverlayTrigger>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationTable
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default TableAPI;
