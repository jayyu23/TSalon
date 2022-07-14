import React, { useState, useEffect } from "react";
import TBook from "./tbook";
import axios from "axios";
import endpoints from "../auth/endpoints";

function UserCollection(props) {
  const username = props.username;
  const [collected, setCollected] = useState([]);
  const [usernameDisplay, setUsernameDisplay] = useState("");

  useEffect(() => {
    // Check if the user exists
    axios.get(endpoints.getUserCollectionAPI(username)).then(
      (acc) => {
        console.log(acc.data.tbooks);
        setCollected(acc.data.tbooks);
        setUsernameDisplay(acc.data.username + "'s Bookshelf");
      },
      (rej) => {
        console.log(rej);
      }
    );
  }, []);

  return (
    <div className="container w-100 mt-3">
      <h1 className="text-center">{usernameDisplay}</h1>
      <ul className="nav nav-pills nav-fill mb-5">
        {/* <li className="nav-item">
          <a id="t1" className="nav-link active" href="#">
            {`Collected (${10})`}
          </a>
        </li>
        <li className="nav-item">
          <a id="t2" className="nav-link" href="#">
            {`Published (${3})`}
          </a>
        </li> */}
      </ul>
      <div className="row justify-content-center px-0 w-100 py-3">
        {collected.map((data) => (
          <TBook
            tbsn={data.tbsn}
            key={data.tbsn}
            title={data.title}
            blurb={data.blurb}
            author={data.author}
            coverImage={data.coverImage}
          />
        ))}
      </div>
    </div>
  );
}

export default UserCollection;
