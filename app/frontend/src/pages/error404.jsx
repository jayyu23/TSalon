import React, { Component } from "react";
import NavBar from "../components/navbar";

class Error404 extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  imgUrl = "/assets/cafedeflore.jpg";

  render() {
    return (
      <div className="my-0 py-0">
        <NavBar />
        <div
          className="bg img-fluid"
          style={{
            backgroundImage: `url(${this.imgUrl})`,
            height: "100vh",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div class="container d-flex align-items-center justify-content-center text-center h-100">
            <div class="text-white">
              <h1 class="h1 mb-3" style={{ fontSize: 80 }}>
                Error 404
              </h1>
              <h5 class="mb-4">Page Not Found</h5>
              <a
                className="btn btn-primary my-3"
                href="/"
                style={{ borderRadius: 25 }}
              >
                Return Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Error404;
