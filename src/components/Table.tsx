import { Column } from "../App";
import { Table } from "react-bootstrap";
import { FC } from "react";
import "./table.css"

type Data = {
  [key: string]: string | number;
};

type ApiResponse = {
  columns: Column[];
  data: Data[];
};

const TableFC: FC<ApiResponse> = ({ columns, data }) => {
  return (
    <div className="tableSection">
      <Table className="table" responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {columns.map((column) => (
              <th key={column.fieldName}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{row[column.fieldName]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default TableFC;
