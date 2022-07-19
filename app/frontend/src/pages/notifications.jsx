import React, { useState, useEffect } from "react";
import auth from "../auth/authhandler.js";
import NavBar from "../components/navbar.jsx";
import Sidebar from "../components/sidebar.jsx";
import Notification from "../components/notification.jsx";

function Notifications() {
  auth.protectRoute();

  return (
    <div className="container h-100 mx-0 px-0 mt-3 w-100">
      <NavBar />
      <div className="row h-100 w-100">
        <div className="col-md-3 col-xs-12">
          <Sidebar active={4} />
        </div>
        <div
          className="col-xs-12 col-md-9 justify-content-center"
          style={{ minHeight: window.innerHeight }}
        >
          <h1 className="my-5 pt-3 text-center">Notifications</h1>
          <Notification />
          <Notification />
          <Notification />
        </div>
      </div>
    </div>
  );
}

export default Notifications;
