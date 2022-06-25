import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TBookView from "../components/tbookview";
import NavBar from "../components/navbar";

function TBookPub(props) {
  let navigate = useNavigate();
  let { tbsn } = useParams();

  return (
    <div>
      <NavBar />
      <div className="container justify-content-center my-5 pt-3">
        <TBookView tbsn={tbsn} />

        <span className="row px-5 justify-content-center">
          <a href="/" className="btn btn-lg btn-secondary mx-5 px-4">
            Back
          </a>
          <a href="#" className="btn btn-lg btn-primary px-4">
            Collect
          </a>
        </span>
      </div>
    </div>
  );
}
export default TBookPub;
