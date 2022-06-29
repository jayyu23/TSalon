import React, { useState, useEffect } from "react";
import auth from "../auth/authhandler";
import NavBar from "../components/navbar";
import Sidebar from "../components/sidebar";
import TBookView from "../components/tbookview";

function ReviewPage(props) {
  auth.protectRoute();
  return (
    <div
      className="container h-100 mx-0 px-0 mt-3 w-100"
      style={{ minHeight: 800 }}
    >
      <NavBar />
      <div className="row h-100 w-100">
        <div className="col-md-3 col-xs-12">
          <Sidebar active={3} />
        </div>
        <div className="col-xs-12 col-md-9 my-0 " style={{ minHeight: 800 }}>
          <h1 className="my-5 pt-5 text-center">Review TBook Drafts</h1>
          <div className="card mx-3 w-100 h-auto px-4 mx-4">
            <TBookView mode="draft" tbsn={75031} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;
