import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
