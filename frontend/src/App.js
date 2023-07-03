//import logo from './logo.svg';
import "./App.css";
//import Navbar from "./components/Navbar";
import Navbar from "./components/Navbar";
import Selects from "./components/Selects";
import Table from "./components/Table";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="bg-gridGray">
      <Navbar />
      <Selects />
      <Table />
    </div>
  );
}

export default App;
