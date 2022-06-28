import React, { Component } from "react";
import NavBar from "../components/navbar";
import TBookStore from "../components/tbookstore";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App container-flex d-col">
        <NavBar showImage="true" />
        <div className="my-5 pt-5">
          <TBookStore />
        </div>
      </div>
    );
  }
}

export default HomePage;
