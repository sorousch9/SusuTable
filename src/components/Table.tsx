import { Column } from "../App";

type Data = {
  [key: string]: string | number;
};

type ApiResponse = {
  columns: Column[];
  data: Data[];
};

const Table: React.FC<ApiResponse> = ({ columns, data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>{row[column.Header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
