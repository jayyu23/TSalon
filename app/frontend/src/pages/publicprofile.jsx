import { Collection } from "mongoose";
import React, { useState, useEffect } from "react";
import UserCollection from "../components/collection";
import NavBar from "../components/navbar";

const user = "Fishylosopher";
function PublicProfile() {
  return (
    <div>
      <NavBar />
      <div className="mt-5 pt-5">
        <UserCollection />
      </div>
    </div>
  );
}

export default PublicProfile;
