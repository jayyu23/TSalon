import React, { useState, useEffect } from "react";
import TBook from "./tbook";

function UserCollection(props) {
  const username = props.username || "Fishylosopher";
  return (
    <div className="container w-100 text-center">
      <h1>{username + "'s Bookshelf"}</h1>
      <ul className="nav nav-pills nav-fill mb-5">
        <li className="nav-item">
          <a id="t1" className="nav-link active" href="#">
            {`Collected (${10})`}
          </a>
        </li>
        <li className="nav-item">
          <a id="t2" className="nav-link" href="#">
            {`Published (${3})`}
          </a>
        </li>
      </ul>
      <div className="row justify-content-center p-3">
        <TBook />
        <TBook />
        <TBook />
        <TBook />
        <TBook />
      </div>
    </div>
  );
}

export default UserCollection;
