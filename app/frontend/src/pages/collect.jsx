import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import TBook from "../components/tbook";
import Web3 from "web3";
import TBookFactory from "../abi/TBookFactory.json";

function CollectPage(props) {
  const defaultWallet = "0x1B952d4C29f552318BD166065F66423f6665e2E4";
  const contractAddress = "0x8146cD312CB3BAc63D2C6c20711D8c2CD0910961";
  const infuraToken = "c79eec7f045b4dab93931eb64ef7b967";
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/" + infuraToken
    )
  );

  const testPublication = async () => {
    try {
      const networkId = await web3.eth.net.getId();
      let contract = new web3.eth.Contract(
        TBookFactory.abi,
        TBookFactory.networks[networkId].address
      );
      let returnTrue = await contract.methods.returnTrue().call();
      console.log(returnTrue);

      // let estimatedGas = await contract.methods
      //   .publish(75030, defaultWallet)
      //   .estimateGas({ from: defaultWallet });
      // console.log(estimatedGas);
      // let result = await contract.methods
      //   .publish(75030, defaultWallet)
      //   .call({ from: defaultWallet, gas: Math.round(estimatedGas * 1.2) });
      console.log("Publication successful");
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
