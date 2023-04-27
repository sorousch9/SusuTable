import { Column } from "../App";
import { OverlayTrigger, Pagination, Table } from "react-bootstrap";
import { FC, useState } from "react";
import "./table.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Popover from "react-bootstrap/Popover";
type Data = {
  [key: string]: string | number;
};

type Props = {
  columns: Column[];
  data: Data[];
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  totalCount: number;
  PAGE_SIZE: number;
  selectedColumn: string;
  setSelectedColumn: (selectedColumn: string) => void;
  setSearchText: (inputText: string) => void;
  searchText: string;
};
const TableFC: FC<Props> = ({
  columns,
  selectedColumn,
  setSelectedColumn,
  setSearchText,
  searchText,
  data,
  setCurrentPage,
  currentPage,
  totalCount,
  PAGE_SIZE,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                <div className="columnHeaderContent">
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
                            <input
                              type="number"
                              placeholder="Enter a number"
                              value={
                                selectedColumn === column.fieldName
                                  ? searchText
                                  : ""
                              }
                              onChange={(e) => {
                                setSelectedColumn(column.fieldName);
                                setSearchText(e.target.value);
                              }}
                            />
                          ) : column.dataTypeName === "calendar_date" ? (
                            <input
                              type="date"
                              placeholder="Select a date"
                              value={
                                selectedColumn === column.fieldName
                                  ? searchText
                                  : ""
                              }
                              onChange={(e) => {
                                setSelectedColumn(column.fieldName);
                                setSearchText(e.target.value);
                              }}
                            />
                          ) : (
                            ""
                          )}
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <span className="columnName">{column.name}</span>
                  </OverlayTrigger>
                  <span
                    className="columnBtn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <BiDotsVerticalRounded />
                  </span>
                </div>
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
