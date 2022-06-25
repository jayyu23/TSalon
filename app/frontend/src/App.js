import React, { Component } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import TBook from "./components/tbook";
import TSalonEditor from "./pages/editor";
import TBookView from "./components/tbookview";
import Error404 from "./pages/error404";
import UserMenu from "./components/sidebar";
import TBookStore from "./components/tbookstore";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import SideBar from "./components/sidebar";

class App extends Component {
  constructor(props) {
    super(props);
  }
  // state = {  }
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sidebar" element={<SideBar />} />
          <Route path="/editor" element={<TSalonEditor />} />
          <Route path="/view/:tbsn" element={<TBookView />} />
          <Route path="/error" element={<Error404 />} />
          <Route path="/bookstore" element={<TBookStore />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
