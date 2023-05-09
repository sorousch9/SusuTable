import { useEffect, useState, useMemo, FC } from "react";
import { OverlayTrigger, Pagination, Table } from "react-bootstrap";
import "./table.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Popover from "react-bootstrap/Popover";
import { BsSortDownAlt } from "react-icons/bs";
import { BsSortUp } from "react-icons/bs";
import axios from "axios";
import { DataRow, PropsStateColumns, Value } from "../../types/tableTypes";

const PAGE_SIZE = 10;
const TableAPI: FC<PropsStateColumns> = ({ columns, setColumns }) => {
  const [selectedColumn, setSelectedColumn] = useState<string>("date");
  const [data, setData] = useState<DataRow[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
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
  console.log(sortOrder);
  console.log(selectedColumn);

  function updateOrder(fv: string, sv: "ASC" | "DESC") {
    setSelectedColumn(fv);
    setSortOrder(sv);
    return;
  }
  const API_BASE_URL = "https://data.cityofnewyork.us";
  const API_ROUTES = useMemo(() => {
    let dataRoute = `/id/xnfm-u3k5.json?$limit=${PAGE_SIZE}&$offset=${currentPage}`;
    let countRoute = `/id/xnfm-u3k5.json?$select=count(*) as __count_alias__`;

    let searchClause = "$where=";
    let rangeClause = "";

    let dateRangeClause = "";
    if (inputSelectedColumn.textValue && queryValue.textValue) {
      searchClause += `(upper(%60${inputSelectedColumn.textValue}%60) LIKE '%25${queryValue.textValue}%25') `;
      updateOrder(inputSelectedColumn.textValue, "ASC");
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
        updateOrder(inputSelectedColumn.minValue, "ASC");
      }
      if (queryValue.maxValue !== 0) {
        if (queryValue.minValue !== 0) {
          rangeClause += ` AND `;
        }
        rangeClause += `${inputSelectedColumn.maxValue} <= ${queryValue.maxValue}`;

        updateOrder(inputSelectedColumn.maxValue, "DESC");
      }

      searchClause += rangeClause;
      if (queryValue.startDate || queryValue.endDate) {
        searchClause += " AND ";
      }
    }

    if (queryValue.startDate || queryValue.endDate) {
      if (queryValue.startDate) {
        dateRangeClause += `${inputSelectedColumn.startDate} >= '${queryValue.startDate}'`;
        updateOrder(inputSelectedColumn.startDate, "ASC");
      }
      if (queryValue.endDate) {
        if (queryValue.startDate) {
          dateRangeClause += ` AND `;
        }
        dateRangeClause += `${inputSelectedColumn.endDate} <= '${queryValue.endDate}'`;
        updateOrder(inputSelectedColumn.endDate, "DESC");
      }

      searchClause += dateRangeClause;
    }

    if (searchClause) {
      searchClause = `&${searchClause}`;
      dataRoute += searchClause;
      countRoute += searchClause;
    }
    if (selectedColumn) {
      dataRoute += `&$order=${selectedColumn} ${sortOrder}`;
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

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const pages = [];
  const maxPagesToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  if (startPage > 1) {
    pages.unshift(<Pagination.Ellipsis key="startEllipsis" />);
  }

  if (endPage < totalPages) {
    pages.push(<Pagination.Ellipsis key="endEllipsis" />);
  }

  const HandleChangeValue = (key: keyof Value, value: Value[keyof Value]) => {
    setQueryValue((prevState) => ({ ...prevState, [key]: value }));
  };
  const HandleChangeColumns = (key: keyof Value, value: Value[keyof Value]) => {
    setInputSelectedColumn((prevState) => ({ ...prevState, [key]: value }));
  };

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
                              min={column.cachedContents.smallest}
                              max={column.cachedContents.largest}
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
                              min={column.cachedContents.smallest}
                              max={column.cachedContents.largest}
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
                              min={column.cachedContents.smallest}
                              max={column.cachedContents.largest}
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
                              min={column.cachedContents.smallest}
                              max={column.cachedContents.largest}
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
                            updateOrder(column.fieldName, "ASC");
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
                            updateOrder(column.fieldName, "DESC");
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
                        {row[column.fieldName]}
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <td key={columnIndex}>{row[column.fieldName]}</td>
                </OverlayTrigger>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center">
        <Pagination.First
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pages}
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
        <Pagination.Next
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};
export default TableAPI;
