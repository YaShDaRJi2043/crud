import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./componenets/Register";
import Home from "./componenets/Home";
import Header from "./componenets/Header";
import Edit from "./componenets/Edit";
import View from "./componenets/View";
import Error from "./componenets/Error";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
