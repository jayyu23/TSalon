import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import Sidebar from "../components/sidebar";
import TBook from "../components/tbook";

function UserDrafts() {
  // Javascript to manage tabs
  const showTab1 = () => {
    document.getElementById("t2").className = "nav-link";
    document.getElementById("t1").className = "nav-link active";
    document.getElementById("tab2").style = "display: none";
    document.getElementById("tab1").style = "display: flex";
  };

  const showTab2 = () => {
    document.getElementById("t2").className = "nav-link active";
    document.getElementById("t1").className = "nav-link";
    document.getElementById("tab1").style = "display: none";
    document.getElementById("tab2").style = "display: flex";
  };

  return (
    <div className="h-100">
      <div className="container h-100 mx-0 px-0 mt-3 w-100">
        <NavBar />
        <div className="row h-100 w-100">
          <div className="col-md-3 col-xs-12">
            <Sidebar active={1} />
          </div>

          <div className="col-xs-12 col-md-9 my-0 " style={{ minHeight: 800 }}>
            <h1 className="my-5 pt-5 text-center">My Drafts</h1>

            <ul class="nav nav-pills nav-fill mb-5">
              <li class="nav-item">
                <a id="t1" class="nav-link active" href="#" onClick={showTab1}>
                  Unpublished Drafts
                </a>
              </li>
              <li class="nav-item">
                <a id="t2" class="nav-link" href="#" onClick={showTab2}>
                  Under Peer Review
                </a>
              </li>
            </ul>

            <span
              id="tab1"
              className="row mx-3 my-2 justify-content-center"
              style={{ display: "flex" }}
            >
              <div className="card mx-3" style={{ width: "25rem" }}>
                <h2 className="card-title text-center my-5"> New Draft </h2>
                <a href="/editor">
                  <i
                    className="card-img-top fa fa-light fa-pen-to-square text-center pt-4"
                    style={{ fontSize: 200, color: "grey" }}
                  ></i>
                </a>
                <h5 className="my-5 px-3 text-center">
                  Start your next masterpiece here...
                </h5>
              </div>
              <TBook short={true} buttonText={"Continue Draft"} />
              <TBook short={true} buttonText={"Continue Draft"} />
              <TBook short={true} buttonText={"Continue Draft"} />
            </span>
            <span
              id="tab2"
              className="row mx-3 my-2 justify-content-center"
              style={{ display: "none" }}
            >
              <TBook short={true} buttonText={"Continue Draft"} />
              <TBook short={true} buttonText={"Continue Draft"} />
              <TBook short={true} buttonText={"Continue Draft"} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDrafts;
