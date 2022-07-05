import { Collection } from "mongoose";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserCollection from "../components/collection";
import NavBar from "../components/navbar";

function PublicProfile() {
  let { username } = useParams();

  useEffect(() => {
    // Check if the user exists
  }, []);
  return (
    <div>
      <NavBar />
      <div className="mt-5 pt-5">
        <UserCollection username={username} />
      </div>
    </div>
  );
}

export default PublicProfile;
