import React, { Component } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import TBook from "./components/tbook";
import TSalonEditor from "./pages/editor";
import TBookView from "./components/tbookview";
import Error404 from "./pages/error404";

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
          <Route path="/book" element={<TBook />} />
          <Route path="/editor" element={<TSalonEditor />} />
          <Route path="/view" element={<TBookView />} />
          <Route path="/error" element={<Error404 />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
