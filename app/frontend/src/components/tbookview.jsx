import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import sanitizeHTML from "sanitize-html";
import axios from "axios";

function TBookView(props) {
  let navigate = useNavigate();
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

  console.log(tbsn);
  useEffect(() => {
    axios.get("http://localhost:8000/api/publication/" + tbsn).then(
      (result) => {
        let data = result.data;
        setPub(data);
      },
      (error) => {
        console.log(error);
        window.location = "/error";
      }
    );
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
        <p className="font-italic my-2">By: {pub.author}</p>
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
