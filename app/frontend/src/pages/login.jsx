import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import Web3 from "web3";
import axios from "axios";

function LoginPage(props) {
  let defaultLoginAddress = window.ethereum
    ? window.ethereum.selectedAddress
    : null;

  const [loginAddress, setLoginAddress] = useState(defaultLoginAddress);

  useEffect(() => {
    // upon init
    setLoginAddress(window.ethereum.selectedAddress);
    // upon change
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        setLoginAddress(window.ethereum.selectedAddress);
      });
    }
  });

  const loginETH = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then(
        (acc) => {
          window.web3 = new Web3(window.ethereum);
          return true;
        },
        (rej) => {
          alert("Login Error. " + rej.message);
          return false;
        }
      );
    } else {
      alert("Login Error. MetaMask Not Detected");
      return false;
    }
  };

  const checkUserExists = () => {
    axios
      .post("http://localhost:8000/api/checkuser", {
        walletAddress: loginAddress,
      })
      .then(
        (acc) => {
          console.log(acc);
          window.location = "/register";
        },
        (rej) => {
          console.log(rej);
        }
      );
  };

  return (
    <div>
      <NavBar showImage={"true"} />
      <div>
        <div className="h1 text-center pt-3 mt-5">Login</div>
        <p className="text-center font-weight-light">
          Account: {loginAddress || "Not Connected"}
        </p>
        <div className="d-flex justify-content-center py-5 px-4">
          <button
            className="btn btn-primary py-4 mx-5 w-25 text-center"
            onClick={loginETH}
            style={{ borderRadius: 25 }}
          >
            Connect Using MetaMask
          </button>
          <button
            className={
              loginAddress == null
                ? "btn btn-danger "
                : "btn btn-success " + "py-4 px-5 w-25 text-center"
            }
            disabled={loginAddress == null}
            onClick={checkUserExists}
            style={{ borderRadius: 25 }}
          >
            Continue Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
