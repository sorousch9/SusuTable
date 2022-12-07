import { useState } from "react";
import "./App.css";
import Form from "./components/Form";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Form/>
    </div>
  );
}

export default App;
