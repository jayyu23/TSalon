import axios from "axios";
import { React, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import NavBar from "../components/navbar";
import UserMenu from "../components/usermenu";

const author = "Anonymous";

function TSalonEditor(props) {
  const blurbLength = 300;
  const imgUrl = "assets/logo_square_blue.png";
  const navigate = useNavigate();
  const editor = useRef();
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const submitPost = () => {
    let apiURL = "http://localhost:8000/api/publications";
    let postBody = {
      title: document.getElementById("postTitle").value,
      blurb: document.getElementById("postBlurb").value,
      author: author,
      content: editor.current.getContents(),
    };
    axios.post(apiURL, postBody).then((res) => {
      let tbsn = res.data.publication.tbsn;
      navigate("/view/" + tbsn, { replace: true });
    });
  };

  return (
    <div>
      <NavBar />
      <div className="row container-fixed h-100">
        <div className="col-3 h-100">
          <UserMenu active={1} />
        </div>
        <div className="col-9">
          <h1 className="my-5 pt-5 text-center">TSalon Editor</h1>
          <div className="form-group container-fluid px-5 py-4 row">
            <div className="col-xl-5">
              <h4 className="font-weight-normal">Image Cover</h4>
              <img src={imgUrl} alt="Cover Image" height="300" width="300" />
              <input
                className="mt-1"
                type="file"
                accept="image/png"
                disabled={true}
              />
              <p className="text-muted mb-3 mt-2">300x300 PNG</p>
            </div>
            <div className="col-xl-7">
              <h4 className="font-weight-normal">Title</h4>
              <input
                id="postTitle"
                className="form-control"
                style={{ fontSize: 32, fontWeight: "bold" }}
              ></input>
              <h4 className="font-weight-normal mt-5">Blurb</h4>
              <textarea
                id="postBlurb"
                className="form-control"
                rows="4"
                maxLength={blurbLength}
              ></textarea>
              <p className="text-muted mt-1">
                Max Length: {blurbLength} characters
              </p>
            </div>
          </div>
          <div className="px-5">
            <h4 id="postContent" className="font-weight-normal pb-2">
              Content
            </h4>
            <SunEditor
              name="postContent"
              getSunEditorInstance={getSunEditorInstance}
              height="800px"
              width="100%"
              setDefaultStyle="font-family: Arial; font-size: 20px;"
              defaultValue="Start your next masterpiece here..."
              setOptions={{
                buttonList: [
                  [
                    "formatBlock",
                    "paragraphStyle",
                    "bold",
                    "underline",
                    "italic",
                    "strike",
                    "list",
                    "blockquote",
                    "align",
                    "font",
                    "fontColor",
                    "fontSize",
                    "undo",
                    "redo",
                  ],
                ],
              }}
            />
          </div>
          <div className="row justify-content-center my-5">
            <button className="btn btn-primary col-3 mx-3">Save</button>
            <button
              onClick={submitPost}
              type="submit"
              className="btn btn-primary col-3 mx-3"
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TSalonEditor;