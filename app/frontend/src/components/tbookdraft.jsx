import React, { useState, useEffect } from "react";

function TBookDraft(props) {
  const tbsn = props.tbsn || 0;
  const images = ["blue", "green", "orange", "purple"];
  const imageCover = `/assets/logo_square_${
    images[Math.floor(Math.random() * images.length)]
  }.png`;

  const setSession = () => {
    sessionStorage.setItem("draftTBSN", tbsn);
  };

  return (
    <div className="card mx-3" style={{ width: "25rem" }}>
      <img
        className="card-img-top"
        src={props.imageCover || imageCover}
        alt="TBook Draft Image Cap"
      ></img>
      <div className="card-body d-flex w-100 justify-content-center">
        <h5 className="card-title">{props.title || "TBook Draft"}</h5>
      </div>
      <span className="px-5 mt-auto w-100 text-center mb-4">
        <a
          href="/editor"
          className="btn btn-primary m-2 px-5 text-center"
          onClick={setSession}
        >
          Continue Draft
        </a>
      </span>
    </div>
  );
}

export default TBookDraft;
