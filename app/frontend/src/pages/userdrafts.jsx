import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import Sidebar from "../components/sidebar";
import TBookDraft from "../components/tbookdraft";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import auth from "../auth/authhandler";
import endpoints from "../auth/endpoints";

function UserDrafts() {
  const [stage1, setStage1] = useState([]);
  const [stage2, setStage2] = useState([]);
  auth.protectRoute();

  useEffect(() => {
    let token = sessionStorage.getItem("t");
    let username = sessionStorage.getItem("username");

    let route = endpoints.getUserDraftAPI(username);
    let body = { walletAddress: sessionStorage.getItem("address") };
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    console.log(route);
    console.log(body);
    console.log(config);
    axios.post(route, body, config).then(
      (acc) => {
        let data = acc.data;
        setStage1(data.stage1);
        setStage2(data.stage2);
      },
      (rej) => {
        console.log(rej);
      }
    );
  }, []);

  // Javascript to manage tabs
  const showTab1 = () => {
    document.getElementById("t2").className = "nav-link";
    document.getElementById("t1").className = "nav-link active";
    document.getElementById("tab2").style = "display: none";
    document.getElementById("tab1").style = "display: flex";
  };

  const showTab2 = () => {
    document.getElementById("t2").className = "nav-link active";
    document.getElementById("t1").className = "nav-link";
    document.getElementById("tab1").style = "display: none";
    document.getElementById("tab2").style = "display: flex";
  };

  return (
    <div className="h-100">
      <div className="container h-100 mx-0 px-0 mt-3 w-100">
        <NavBar />
        <div className="row h-100 w-100">
          <div className="col-md-3 col-xs-12">
            <Sidebar active={2} />
          </div>

          <div className="col-xs-12 col-md-9 my-0 " style={{ minHeight: 800 }}>
            <h1 className="my-5 pt-5 text-center">
              Welcome, {sessionStorage.getItem("username")}
            </h1>

            <ul className="nav nav-pills nav-fill mb-5">
              <li className="nav-item">
                <a
                  id="t1"
                  className="nav-link active"
                  href="#"
                  onClick={showTab1}
                >
                  Unpublished Drafts
                </a>
              </li>
              <li className="nav-item">
                <a id="t2" className="nav-link" href="#" onClick={showTab2}>
                  Under Peer Review
                </a>
              </li>
            </ul>

            <span
              id="tab1"
              className="row mx-3 my-2 justify-content-center"
              style={{ display: "flex" }}
            >
              <div className="card mx-3" style={{ width: "25rem" }}>
                <h2 className="card-title text-center my-5"> New Draft </h2>
                <a
                  href="/editor"
                  onClick={() => {
                    sessionStorage.setItem("draftTBSN", 0);
                  }}
                >
                  <i
                    className="card-img-top fa fa-light fa-pen-to-square text-center pt-4"
                    style={{ fontSize: 200, color: "grey" }}
                  ></i>
                </a>
                <h5 className="my-5 px-3 text-center">
                  Start your next masterpiece here...
                </h5>
              </div>
              {stage1.map((data) => (
                <TBookDraft
                  key={data.tbsn}
                  tbsn={data.tbsn}
                  title={data.title}
                  author={data.author}
                  imageCover={data.coverImage}
                />
              ))}
            </span>
            <span
              id="tab2"
              className="row mx-3 my-2 justify-content-center"
              style={{ display: "none" }}
            >
              {stage2.map((data) => (
                <TBookDraft
                  key={data.tbsn}
                  tbsn={data.tbsn}
                  title={data.title}
                  author={data.author}
                  imageCover={data.coverImage}
                />
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDrafts;
