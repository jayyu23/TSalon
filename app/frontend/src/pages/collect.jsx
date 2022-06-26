import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import TBook from "../components/tbook";
import Web3 from "web3";
import TBookFactory from "../abi/TBookFactory.json";

function CollectPage(props) {
  const defaultWallet = "0xb1944fdc36962958b471aCeD0699ADbad3B39D1e";
  const testPublication = async () => {
    try {
      const contractAddress = "0x42f507A2cC60C26074a89F3c14809767716bc2D2";

      const web3 = new Web3(
        new Web3.providers.HttpProvider("http://127.0.0.1:7545")
      );
      const networkId = await web3.eth.net.getId();
      let contract = new web3.eth.Contract(
        TBookFactory.abi,
        TBookFactory.networks[networkId].address
      );

      let estimatedGas = await contract.methods
        .publish(75030, defaultWallet)
        .estimateGas({ from: defaultWallet });
      console.log(estimatedGas);
      let result = await contract.methods
        .publish(75030, defaultWallet)
        .call({ from: defaultWallet, gas: Math.round(estimatedGas * 1.2) });
      console.log("Publication successful");
      console.log(result);
      //   console.log(contract.methods);
      //   let returnTrue = await contract.methods.returnTrue().call();
      //   console.log(returnTrue);
    } catch (err) {
      console.log(err);
    }
  };

  //   let estimatedGas = await contract.methods
  //     .publish(75030, defaultWallet)
  //     .estimateGas({ from: defaultWallet });
  //   console.log(estimatedGas);
  //   await contract.methods
  //     .publish(75030, defaultWallet)
  //     .send({ from: defaultWallet, gas: Math.round(estimatedGas * 1.2) });
  //   console.log("Publication successful");

  //   const testReadState = async () => {
  //     // get the user
  //     let userInfo = await contract.methods
  //       .returnTrue()
  //       .send({ from: defaultWallet });
  //     console.log(userInfo);
  //   };

  return (
    <div>
      <NavBar />
      <div className="container row mt-5 pt-5">
        <div className="container col">
          <TBook />
        </div>
        <div className="container col">
          <p className="">Address</p>
          <input
            type="text"
            className="form-control"
            defaultValue={defaultWallet}
          />
          <button onClick={testPublication} className="btn btn-success my-5">
            Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default CollectPage;
