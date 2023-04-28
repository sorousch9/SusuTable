import { useEffect, useState, useCallback, useMemo, FC } from "react";
import { OverlayTrigger, Pagination, Table } from "react-bootstrap";
import "./table.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Popover from "react-bootstrap/Popover";
import { BsSortDownAlt } from "react-icons/bs";
import { BsSortUp } from "react-icons/bs";
import axios from "axios";
import { Column, DataRow } from "../../types/Table";

const PAGE_SIZE = 10;
const TableFC: FC = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [data, setData] = useState<DataRow[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const API_BASE_URL = "https://data.cityofnewyork.us";
  const API_ROUTES = useMemo(() => {
    let dataRoute = `/id/xnfm-u3k5.json?$limit=${PAGE_SIZE}&$offset=${currentPage}`;
    let countRoute = `/id/xnfm-u3k5.json?$select=count(*) as __count_alias__`;
    if (selectedColumn && searchText) {
      const searchClause = `&$where=(upper(${selectedColumn}) LIKE '%25${searchText}%25')`;
      dataRoute += searchClause;
      countRoute += searchClause;
    }
    if (minValue !== 0 || maxValue !== 0) {
      let rangeClause = "&$where=(";
      if (minValue !== 0) {
        rangeClause += `${selectedColumn} >= ${minValue}`;
      }
      if (maxValue !== 0) {
        if (minValue !== 0) {
          rangeClause += ` AND `;
        }
        rangeClause += `${selectedColumn} <= ${maxValue}`;
      }
      rangeClause += ")";
      dataRoute += rangeClause;
      countRoute += rangeClause;
    }
    if (startDate && endDate) {
      let dateRangeClause = "&$where=(";
      if (startDate) {
        dateRangeClause += `${selectedColumn} >= '${startDate}'`;
      }
      if (endDate) {
        if (startDate) {
          dateRangeClause += ` AND `;
        }
        dateRangeClause += `${selectedColumn} <= '${endDate}'`;
      }
      dateRangeClause += ")";
      dataRoute += dateRangeClause;
      countRoute += dateRangeClause;
    }

    return {
      data: dataRoute,
      count: countRoute,
      columns: "/api/views/xnfm-u3k5.json?&$$read_from_nbe=true&$$version=2.1",
    };
  }, [
    currentPage,
    selectedColumn,
    searchText,
    minValue,
    maxValue,
    startDate,
    endDate,
  ]);
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const [dataResponse, countResponse, columnsResponse] =
          await Promise.all([
            axios.get(`${API_BASE_URL}${API_ROUTES.data}`),
            axios.get(`${API_BASE_URL}${API_ROUTES.count}`),
            axios.get(`${API_BASE_URL}${API_ROUTES.columns}`),
          ]);
        setData(dataResponse.data);
        setColumns(columnsResponse.data.columns);
        setTotalCount(countResponse.data[0].__count_alias__);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTableData();
  }, [API_ROUTES]);

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
                              selectedColumn === column.fieldName
                                ? searchText
                                : ""
                            }
                            onChange={(e) => {
                              setSelectedColumn(column.fieldName);
                              setSearchText(e.target.value.toUpperCase());
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
                                selectedColumn === column.fieldName
                                  ? Number(minValue)
                                  : ""
                              }
                              onChange={(e) => {
                                setSelectedColumn(column.fieldName);
                                setMinValue(Number(e.target.value));
                              }}
                            />
                            {" - "}
                            <input
                              type="number"
                              placeholder="Max number"
                              min={column.cachedContents.smallest}
                              max={column.cachedContents.largest}
                              value={
                                selectedColumn === column.fieldName
                                  ? Number(maxValue)
                                  : ""
                              }
                              onChange={(e) => {
                                setSelectedColumn(column.fieldName);
                                setMaxValue(Number(e.target.value));
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
                                selectedColumn === column.fieldName
                                  ? startDate.toString()
                                  : ""
                              }
                              onChange={(e) => {
                                setSelectedColumn(column.fieldName);
                                setStartDate(e.target.value);
                              }}
                            />
                            <label>End date:</label>
                            <input
                              type="date"
                              min={column.cachedContents.smallest}
                              max={column.cachedContents.largest}
                              value={
                                selectedColumn === column.fieldName
                                  ? endDate.toString()
                                  : ""
                              }
                              onChange={(e) => {
                                setSelectedColumn(column.fieldName);
                                setEndDate(e.target.value);
                              }}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        <button className="sortMenuBtn">
                          <span className="sortMenuIco">
                            <BsSortUp size={"1.5rem"} />
                          </span>
                          <span className="sortMenuContent">
                            Sort Ascending
                          </span>
                        </button>
                        <button className="sortMenuBtn">
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
export default TableFC;
