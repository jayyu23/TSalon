import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import sanitizeHTML from "sanitize-html";
import axios from "axios";
import endpoints from "../auth/endpoints";
import auth from "../auth/authhandler";

function TBookView(props) {
  const defaultSettings = {
    author: "",
    coverImage: "",
    title: "",
    content: "",
  };

  const [pub, setPub] = useState(defaultSettings);
  let { tbsn } = useParams();
  if (props.tbsn) {
    tbsn = props.tbsn;
  }

  const API = props.mode == "draft" ? null : endpoints.getPublicationAPI(tbsn);

  useEffect(() => {
    let res = (acc) => {
      let data = acc.data;
      setPub(data);
    };
    let err = (rej) => {
      console.log(rej);
      window.location = "/error";
    };

    if (props.mode == "draft") {
      setPub(props.draftContent);
    } else {
      axios.get(endpoints.getPublicationAPI(tbsn)).then(res, err);
    }
  }, []);

  const getBodyHTML = () => {
    let rawHTML = props.content || pub.content;
    // prevent XSS attacks
    return sanitizeHTML(rawHTML);
  };
  console.log(pub.coverImage);
  return (
    <div>
      <div className="text-center justify-content-center">
        <h1 className="font-weight-bold mt-4 mb-2 mx-5 px-5">{pub.title}</h1>

        <img
          className="mt-3"
          src={pub.coverImage}
          alt="Cover Image for Article"
        />
        <p className="font-italic my-2">
          {props.mode == "draft" ? "" : "By: " + pub.author}
        </p>
        <p className="font-weight-light font-italic my-2 px-5 mx-5">
          {pub.blurb}
        </p>
        <div className="row d-flex justify-content-center">
          <div className="my-4 text-left mx-5 px-5" style={{ maxWidth: 800 }}>
            {parse(getBodyHTML())}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TBookView;
