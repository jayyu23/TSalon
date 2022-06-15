import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";

function RegisterPage(props) {
  return (
    <div>
      <NavBar />
      <div className="h1 text-center pt-5 mt-5">Register User</div>
      <div className="h4 text-center mt-3 font-weight-normal">
        Welcome to TSalon!
      </div>
      <div className="container px-5">
        <h4 className="font-weight-normal mt-5 mb-3">Pen Name</h4>
        <p className="text-muted mt-1 mb-1">Your Unique Identifier on TSalon</p>
        <div className="row">
          <input
            type="text"
            className="form-control w-50 ml-3 mr-4"
            style={{ maxWidth: "600px", height: 60 }}
          />
          <button className="btn btn-success w-25" style={{ borderRadius: 25 }}>
            Register
          </button>
        </div>
        <p className="text-muted mt-2">
          Requirements: Length 3-20, Numbers, Letters, and Space Bar
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
