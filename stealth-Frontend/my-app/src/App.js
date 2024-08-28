import { Component } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Login from "./components/Login";
import BizLogin from "./components/BizLogin";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/biz-login" element={<BizLogin />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
