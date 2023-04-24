import { Column } from "../App";
import { Table } from "react-bootstrap";

type Data = {
  [key: string]: string | number;
};

type ApiResponse = {
  columns: Column[];
  data: Data[];
};

const TableFC: React.FC<ApiResponse> = ({ columns, data }) => {
  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          {columns.map((column) => (
            <th key={column.accessor}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>{rowIndex + 1}</td>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>{row[column.Header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableFC;
