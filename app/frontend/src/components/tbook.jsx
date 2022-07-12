import React, { useState, useEffect } from "react";

function TBook(props) {
  const defaultSettings = {
    title: "TSalon Publication",
    blurb:
      "TSalon is a Web 3.0 publishing house and literary salon, providing readers with quality-assured NFT essays called TBooks",
    author: "Anonymous",
    link: "#",
  };
  const images = ["blue", "green", "orange", "purple"];
  const imageCover = `/assets/logo_square_${
    images[Math.floor(Math.random() * images.length)]
  }.png`;

  const readCollectHTML = (
    <span className="px-3 mt-auto">
      <a
        href={props.link ? props.link : defaultSettings.link}
        className="btn btn-primary m-2 px-auto"
        style={{ borderRadius: 30 }}
      >
        <i className="fa-solid fa-book-open mx-2"></i>
        Read
      </a>
      <a
        href="/collect"
        className="btn btn-warning m-2 px-auto"
        style={{ borderRadius: 30 }}
      >
        <i className="fa-solid fa-book-bookmark mx-2"></i>
        Collect
      </a>
    </span>
  );

  const readHTML = (
    <span className="px-5 mt-auto w-100 text-center mb-4">
      <a
        href={props.link ? props.link : defaultSettings.link}
        className="btn btn-primary px-5 w-100"
        style={{ borderRadius: 30 }}
      >
        <i className="fa-solid fa-book-open mx-2"></i>
        Read
      </a>
    </span>
  );

  const tbookHTML = (
    <div className="card mx-3 my-4" style={{ width: "25rem" }}>
      <img
        className="card-img-top"
        src={props.imageCover ? props.imageCover : imageCover}
        alt="TBook Image Cap"
      ></img>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          {props.title ? props.title : defaultSettings.title}
        </h5>
        <a
          className=""
          data-bs-toggle="collapse"
          role="button"
          aria-expanded="false"
          aria-controls={"collapseBlurb" + props.tbsn}
          href={"#collapseBlurb" + props.tbsn}
        >
          <i id={"aboutIcon"} className="fa-solid fa-book mx-2"></i>
          About
        </a>
        <div className="collapse" id={"collapseBlurb" + props.tbsn}>
          <p className="card-text">
            {props.blurb ? props.blurb : defaultSettings.blurb}
          </p>
        </div>
        <p className="card-text font-italic">
          By {props.author ? props.author : defaultSettings.author}
        </p>
        {props.short ? readHTML : readCollectHTML}
      </div>
    </div>
  );

  let render = tbookHTML;
  return render;
}

export default TBook;
