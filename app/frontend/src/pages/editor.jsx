import axios from "axios";
import { React, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import NavBar from "../components/navbar";
import Sidebar from "../components/sidebar";
import wordsCount from "words-count";

function TSalonEditor(props) {
  const location = useLocation();
  let { tbsn } = useParams();
  const currentTBSN = tbsn || 0;

  const author = location.state ? location.state.username : "Anonymous";
  console.log(author);
  const navigate = useNavigate();
  const editor = useRef();
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  console.log(editor.current);
  useEffect(() => {
    if (tbsn) {
      // Get request and load content.
      axios.get("http://localhost:8000/api/drafts/" + tbsn).then(
        (acc) => {
          let data = acc.data;
          document.getElementById("postTitle").value = data.title;
          document.getElementById("postBlurb").value = data.blurb;
          editor.current.setContents(data.content);
        },
        (rej) => {}
      );
    }
  }, []);

  const blurbLength = 100; // 100 words
  const minContent = 300; // min word count for content
  const maxContent = 2000; // max word count for content

  const imgUrl = "assets/logo_square_blue.png";

  const getBlurbWordCount = () => {
    let currentText = document.getElementById("postBlurb").value;
    let currentLength = wordsCount(currentText, {
      disableDefaultPunctuation: true,
    });
    let blurbWordCount = document.getElementById("blurbWordCount");
    blurbWordCount.innerText =
      "Word Count: " + currentLength + "/" + blurbLength + " words";
    if (currentLength > blurbLength) {
      blurbWordCount.className = "text-danger mt-1";
      return false;
    } else {
      blurbWordCount.className = "text-muted mt-1";
      return true;
    }
  };

  const getContentWordCount = (content) => {
    let currentText = editor.current.getText();
    let currentLength = wordsCount(currentText, {
      disableDefaultPunctuation: true,
    });
    let wordCountDisplay = document.getElementById("wordCount");
    wordCountDisplay.innerHTML = "Word Count: " + currentLength;
    if (currentLength < minContent || currentLength > maxContent) {
      wordCountDisplay.className = "text-danger mt-0 mx-5";
    } else {
      wordCountDisplay.className = "text-muted mt-0 mx-5";
    }
    return currentLength;
  };

  const validateContentLength = () => {
    // Blurb Check
    let submitErrorMessage = document.getElementById("submitErrorMessage");
    if (getBlurbWordCount()) {
      // Content Check
      let contentLength = getContentWordCount(null);
      if (contentLength < minContent || contentLength > maxContent) {
        submitErrorMessage.innerText = `Error - Content must be between ${minContent} to ${maxContent} words in length`;
        return false;
      } else {
        return true;
      }
    } else {
      submitErrorMessage.innerText = `Error - Blurb length must be under ${blurbLength} words`;
      return false;
    }
  };

  const getSubmitBody = () => {
    return {
      tbsn: currentTBSN,
      title: document.getElementById("postTitle").value,
      blurb: document.getElementById("postBlurb").value,
      author: author,
      content: editor.current.getContents(),
    };
  };

  const submitPost = () => {
    let apiURL = "http://localhost:8000/api/publications";
    if (validateContentLength()) {
      let postBody = getSubmitBody();
      axios.post(apiURL, postBody).then((res) => {
        let tbsn = res.data.publication.tbsn;
        navigate("/view/" + tbsn, { replace: true });
      });
    }
  };

  const savePost = () => {
    let apiURL = "http://localhost:8000/api/drafts";
    let postBody = getSubmitBody();
    axios.post(apiURL, postBody).then((res) => {
      alert("Save Sucessful");
    });
  };

  return (
    <div className="h-100">
      <div className="container h-100 mx-0 px-0 mt-3 w-100">
        <NavBar />
        <div className="row h-100 w-100">
          <div className="col-md-3 col-xs-12" style={{ minWidth: 100 }}>
            <Sidebar active={1} />
          </div>

          <div className="col-xs-12 col-md-9">
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
                  maxLength={50}
                  style={{ fontSize: 32, fontWeight: "bold" }}
                ></input>
                <h4 className="font-weight-normal mt-5">Blurb</h4>
                <textarea
                  id="postBlurb"
                  className="form-control"
                  rows="4"
                  onInput={getBlurbWordCount}
                ></textarea>
                <p id="blurbWordCount" className="text-muted mt-1">
                  Word Count: 0 /{blurbLength} words
                </p>
              </div>
            </div>
            <div className="px-5">
              <h4 id="postContent" className="font-weight-normal">
                Content
              </h4>
              <p className="text-muted mb-0 mt-1">
                Must be {minContent} - {maxContent} words
              </p>
              <SunEditor
                name="postContent"
                getSunEditorInstance={getSunEditorInstance}
                onChange={getContentWordCount}
                height="800px"
                width="100%"
                setDefaultStyle="font-family: Arial; font-size: 20px;"
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
            <p id="wordCount" className="text-muted mt-0 mx-5">
              Word Count: 0
            </p>
            <p id="submitErrorMessage" className="text-danger mt-0 mx-5"></p>
            <div className="row justify-content-center my-5">
              <button className="btn btn-primary col-3 mx-3" onClick={savePost}>
                Save Draft
              </button>
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
    </div>
  );
}

export default TSalonEditor;
