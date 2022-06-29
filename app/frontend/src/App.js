import React, { Component } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import TBook from "./components/tbook";
import TSalonEditor from "./pages/editor";
import TBookView from "./components/tbookview";
import Error404 from "./pages/error404";
import TBookPub from "./pages/tbookpub";
import TBookStore from "./components/tbookstore";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import SideBar from "./components/sidebar";
import CollectPage from "./pages/collect";
import UserDrafts from "./pages/userdrafts";
import ReviewPage from "./pages/review";

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
          <Route path="/collect" element={<CollectPage />} />
          <Route path="/editor" element={<TSalonEditor />} />
          <Route path="/view/:tbsn" element={<TBookPub />} />
          <Route path="/error" element={<Error404 />} />
          <Route path="/bookstore" element={<TBookStore />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/drafts" element={<UserDrafts />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
