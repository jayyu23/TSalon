import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import Web3 from "web3";

function LoginPage(props) {
  let defaultLoginAddress = window.ethereum
    ? window.ethereum.selectedAddress
    : null;

  const [loginAddress, setLoginAddress] = useState(defaultLoginAddress);

  useEffect(() => {
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
          >
            Continue Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
