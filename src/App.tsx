import "./App.css";
import { useEffect, useState } from "react";
import Table from "./components/Table";
export interface Column {
  Header: string;
  accessor: string;
}

type Data = {
  [key: string]: string | number;
};


function App() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    fetch("https://data.cityofnewyork.us/resource/ic3t-wcy2.json")
      .then((response) => response.json())
      .then((data) => {
        const columnKeys = Object.keys(data[0]);

        // Convert array of strings to array of Column objects
        const columns = columnKeys.map((key) => ({
          Header: key,
          accessor: key.toLowerCase(),
        }));

        setData(data);
        setColumns(columns);
      });
  }, []);
  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
