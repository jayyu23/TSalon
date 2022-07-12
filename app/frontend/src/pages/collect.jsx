import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/navbar";
import TBook from "../components/tbook";
import Web3 from "web3";
import axios from "axios";
import TBookFactory from "../abi/TBookFactory.json";
import auth from "../auth/authhandler";
import endpoints from "../auth/endpoints";

function CollectPage(props) {
  const defaultWallet = "0x1B952d4C29f552318BD166065F66423f6665e2E4";
  const contractAddress = "0x8146cD312CB3BAc63D2C6c20711D8c2CD0910961";
  const infuraToken = "c79eec7f045b4dab93931eb64ef7b967";
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/" + infuraToken
    )
  );

  let { tbsn } = useParams();
  const [pub, setPub] = useState({});

  useEffect(() => {
    axios.get(endpoints.getPublicationAPI(tbsn)).then(
      (acc) => {
        let data = acc.data;
        setPub(data);
      },
      (rej) => {
        auth.redirectToError();
      }
    );
  }, []);

  const testPublication = async () => {
    // try {
    //   const networkId = await web3.eth.net.getId();
    //   let contract = new web3.eth.Contract(
    //     TBookFactory.abi,
    //     TBookFactory.networks[networkId].address
    //   );
    //   let returnTrue = await contract.methods.returnTrue().call();
    //   console.log(returnTrue);
    //   // let estimatedGas = await contract.methods
    //   //   .publish(75030, defaultWallet)
    //   //   .estimateGas({ from: defaultWallet });
    //   // console.log(estimatedGas);
    //   // let result = await contract.methods
    //   //   .publish(75030, defaultWallet)
    //   //   .call({ from: defaultWallet, gas: Math.round(estimatedGas * 1.2) });
    //   console.log("Publication successful");
    // } catch (err) {
    //   console.log(err);
    // }
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
      <div className="container row mt-5 pt-5 pl-4 ml-4">
        <h1 className="m-3">Collect TBook NFT</h1>
        <div className="container col justify-content-center">
          <TBook
            short={true}
            title={pub.title}
            link={"/view/" + tbsn}
            blurb={pub.blurb}
            author={pub.author}
            coverImage={pub.coverImage}
          />
        </div>
        <div className="container col-lg">
          <input
            type="text"
            className="form-control"
            defaultValue={defaultWallet}
            style={{ display: "none" }}
          />
          <div className="card my-4 p-4 mx-0">
            <div className="h2 mb-4">
              TBook #{tbsn}
              <i
                className="iconify text-primary mx-auto"
                data-icon="bxs:badge-check"
              ></i>{" "}
            </div>
            <p className="h6 text-muted">Current Floor Price</p>
            <div className="row my-3">
              <i
                className="iconify text-center my-auto"
                data-icon="mdi:ethereum"
                style={{ fontSize: 40, width: 75 }}
              ></i>
              <div className="col-3 h3 mx-0 my-auto">0.01</div>
              <div className="text-muted mx-0 col-3 my-auto">$10.91 USD</div>
              <a
                className="btn btn-sm btn-primary col-3 my-auto"
                style={{ borderRadius: 25 }}
              >
                <i className="fa fa-rotate"></i> Refresh
              </a>
            </div>
            <button
              className="btn btn-warning dropdown-toggle w-100"
              type="button"
              style={{ borderRadius: 25, fontSize: 20 }}
              data-bs-toggle="collapse"
              data-bs-target="#checkoutCollapse"
              aria-expanded="false"
              aria-controls="#checkoutCollapse"
            >
              <i
                className="fa fa-book-bookmark mx-3"
                style={{ fontSize: 20 }}
              ></i>
              Collect
            </button>
            <div className="collapse" id="checkoutCollapse">
              <p className="h5 mb-3 mt-5">Receiving Address</p>
              <input
                className="form form-control"
                type="text"
                defaultValue={defaultWallet}
              />
              <p className="h5 mb-3 mt-5">Payment Amount</p>
              <div className="row w-100">
                <i
                  className="iconify text-center my-auto"
                  data-icon="mdi:ethereum"
                  style={{ fontSize: 20, width: 50 }}
                ></i>
                <input
                  className="form form-control col-6 w-50"
                  type="number"
                  step="0.01"
                  defaultValue={0.01}
                />
                <div
                  className="btn btn-success w-25 mx-auto"
                  style={{ borderRadius: 25 }}
                >
                  Buy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectPage;
