import React, { useState, useEffect } from "react";
import TBook from "./tbook";

function UserCollection(props) {
  const username = props.username || "Fishylosopher";
  return (
    <div className="container w-100 text-center">
      <h1>{username + "'s Bookshelf"}</h1>
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
