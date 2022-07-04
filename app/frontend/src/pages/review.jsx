import React, { useState, useEffect } from "react";
import axios from "axios";
import auth from "../auth/authhandler";
import NavBar from "../components/navbar";
import Sidebar from "../components/sidebar";
import TBookView from "../components/tbookview";
import endpoints from "../auth/endpoints";

function ReviewPage(props) {
  auth.protectRoute();
  const emptyReviewHTML = (
    <div
      className="card mx-3 w-100 h-auto px-4 py-auto mx-4"
      style={{ minHeight: 800 }}
    >
      <div
        className="text-center justify-content-center h3"
        style={{ marginTop: "30%" }}
      >
        Nothing to Review!
      </div>
    </div>
  );

  const [reviewDraft, setReviewDraft] = useState(null);
  const [reviewHTML, setReviewHTML] = useState(emptyReviewHTML);
  useEffect(() => {
    // On load make request to server
    let authContent = auth.getPostAuthData();
    axios
      .post(endpoints.getReviewAPI(), authContent.body, authContent.config)
      .then(
        (acc) => {
          let data = acc.data;
          setReviewDraft(data.reviewDraft);
        },
        (rej) => {
          console.log(rej);
        }
      );
  }, []);
  useEffect(() => {
    if (reviewDraft) {
      setReviewHTML(
        <div className="card mx-3 w-100 h-auto px-4 py-auto mx-4">
          <TBookView
            mode="draft"
            tbsn={reviewDraft}
            draftContent={reviewDraft}
          />
          <span className="container row d-flex">
            <p className="mx-auto col-lg-4" style={{ fontSize: 25 }}>
              Votes Remaining: 10
            </p>
            <div className="col-lg-4 py-auto mx-auto">
              <input
                type="number"
                max={10}
                min={0}
                defaultValue={0}
                className="input form-control"
                style={{ borderRadius: 25 }}
              />
            </div>
            <div className="col-lg-4">
              <button
                className="btn btn-success px-4 mx-3 py-auto mb-5 mt-0"
                style={{ borderRadius: 25 }}
              >
                Submit Votes
                <i className="fa fa-arrow-right mx-2"></i>
              </button>
            </div>
          </span>
        </div>
      );
    } else {
      setReviewHTML(emptyReviewHTML);
    }
  }, [reviewDraft]);

  return (
    <div
      className="container h-100 mx-0 px-0 mt-3 w-100"
      style={{ minHeight: 800 }}
    >
      <NavBar />
      <div className="row h-100 w-100">
        <div className="col-md-3 col-xs-12">
          <Sidebar active={3} />
        </div>
        <div className="col-xs-12 col-md-9 my-0 " style={{ minHeight: 500 }}>
          <h1 className="my-5 pt-5 text-center">Review TBook Drafts</h1>
          <p className="mx-3" style={{ fontSize: 25 }}>
            Votes Remaining: 10
          </p>
          {reviewHTML}
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;
