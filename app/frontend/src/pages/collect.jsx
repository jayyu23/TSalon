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
  let { tbsn } = useParams();
  const [pub, setPub] = useState({});
  const [prices, setPrices] = useState({ priceETH: null, priceUSD: null });
  const [refreshDate, setRefreshDate] = useState(null);
  const [defaultWallet, setDefaultWallet] = useState("");
  const [buyError, setBuyError] = useState("");

  const waitSeconds = 5;

  useEffect(() => {
    axios.get(endpoints.getPublicationAPI(tbsn)).then(
      (acc) => {
        let data = acc.data;
        setPub(data);
        getPrice();
      },
      (rej) => {
        auth.redirectToError();
      }
    );
  }, []);

  useEffect(() => {
    let payBox = document.getElementById("payAmount");
    let buyButton = document.getElementById("buyButton");
    let receiveAddress = document.getElementById("receiveAddress");

    if (prices) {
      if (sessionStorage.getItem("t")) {
        setDefaultWallet(sessionStorage.getItem("address"));

        payBox.defaultValue = prices.priceETH;
        payBox.min = prices.priceETH;
        payBox.disabled = false;
        buyButton.disabled = false;
        receiveAddress.disabled = false;
        setBuyError("");
      } else {
        payBox.disabled = true;
        buyButton.disabled = true;
        receiveAddress.disabled = true;
        setBuyError("Please login first, then click Refresh.");
      }
    } else {
      payBox.disabled = true;
      buyButton.disabled = true;
      receiveAddress.disabled = true;
      setBuyError("Prices not available.");
    }
  }, [prices]);

  const getPrice = () => {
    if (refreshDate) {
      let nowDate = new Date();
      if (nowDate.getTime() - refreshDate.getTime() < waitSeconds * 1000) {
        return; // do nothing
      }
    }
    setPrices({ priceETH: null, priceUSD: null });
    axios.get(endpoints.getPriceAPI(tbsn)).then((acc) => {
      let data = acc.data;
      if (data.success) {
        setPrices(data.priceData);
        setRefreshDate(new Date());
      }
    });
  };
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
              <div className="col-3 h3 mx-0 my-auto">
                {prices.priceETH || "--"}
              </div>
              <div className="text-muted mx-0 col-3 my-auto">
                ${prices.priceUSD || "--"} USD
              </div>
              <a
                className="btn btn-sm btn-primary col-3 my-auto"
                style={{ borderRadius: 25 }}
                onClick={getPrice}
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
                id="receiveAddress"
                disabled={true}
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
                  id="payAmount"
                  className="form form-control col-6 w-50"
                  type="number"
                  step="0.01"
                  defaultValue={0.01}
                  disabled={true}
                />
                <button
                  id="buyButton"
                  className="btn btn-success w-25 mx-auto"
                  disabled={true}
                  style={{ borderRadius: 25 }}
                >
                  Buy
                </button>
                <p className="text-danger my-3 mx-3">{buyError}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectPage;
