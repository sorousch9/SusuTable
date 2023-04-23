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
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.doc__}>{column.job__}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>{row[column.job__]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
