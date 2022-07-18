import axios from "axios";
import { React, useEffect, useRef, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import NavBar from "../components/navbar";
import Sidebar from "../components/sidebar";
import wordsCount from "words-count";
import auth from "../auth/authhandler";
import { extend, update } from "lodash";
import endpoints from "../auth/endpoints";
import TBookView from "../components/tbookview";

function TSalonEditor(props) {
  auth.protectRoute();

  const [currentTBSN, setCurrentTBSN] = useState(
    sessionStorage.getItem("draftTBSN")
  );
  const author = sessionStorage.getItem("username");

  if (!(author && currentTBSN)) {
    auth.redirectToError();
  }

  const editor = useRef();
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  useEffect(() => {
    if (currentTBSN != 0) {
      // Get request and load content.
      let route = endpoints.getDraftAPI(currentTBSN);
      let authData = auth.getPostAuthData();
      axios.post(route, authData.body, authData.config).then(
        (acc) => {
          let data = acc.data;
          document.getElementById("postTitle").value = data.title;
          document.getElementById("postBlurb").value = data.blurb;
          document.getElementById("img").src = data.coverImage;
          editor.current.setContents(data.content);
          getBlurbWordCount();
        },
        (rej) => {
          console.log(rej);
        }
      );
    }
  }, []);
  const [previewHTML, setPreviewHTML] = useState("");

  const blurbLength = 100; // 100 words
  const minContent = 300; // min word count for content
  const maxContent = 2000; // max word count for content

  const defaultImages = ["aqua", "green", "purple", "orange", "yellow"];
  const defaultImgUrl = `assets/logo_square_${
    defaultImages[Math.floor(Math.random() * defaultImages.length)]
  }.png`;

  const [imgURL, setImgURL] = useState(defaultImgUrl);

  const watermark = "assets/logo_circle.png";

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
    let submitErrorMessage = document.getElementById("submitMessage");
    if (getBlurbWordCount()) {
      // Content Check
      let contentLength = getContentWordCount(null);
      if (contentLength < minContent || contentLength > maxContent) {
        submitErrorMessage.className = "text-danger mt-0 mx-5";
        submitErrorMessage.innerText = `Error - Content must be between ${minContent} to ${maxContent} words in length`;

        return false;
      } else {
        return true;
      }
    } else {
      submitErrorMessage.className = "text-danger mt-0 mx-5";
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
      coverImage: document.getElementById("imgCanvas").toDataURL(),
    };
  };

  const submitPost = async () => {
    await savePost();
    let apiURL = endpoints.getDraftSubmitAPI();
    let authData = auth.getPostAuthData();
    if (validateContentLength()) {
      let postBody = getSubmitBody();
      extend(postBody, authData.body);
      axios.post(apiURL, postBody, authData.config).then((res) => {
        window.location.href = "/drafts";
        // let tbsn = res.data.publication.tbsn;
        // window.location.href = "/view/" + tbsn;
      });
    }
  };

  const dangerouslyPublish = async () => {
    await savePost();
    let apiURL = endpoints.getAllPubAPI();
    let postBody = getSubmitBody();
    axios.post(apiURL, postBody).then(
      (res) => {
        let tbsn = res.data.publication.tbsn;
        window.location.href = "/view/" + tbsn;
      },
      (rej) => {
        console.log(rej);
      }
    );
  };

  const savePost = async () => {
    let apiURL = endpoints.getDraftSaveAPI();
    let authData = auth.getPostAuthData();
    let postBody = getSubmitBody();
    extend(postBody, authData.body);

    let submitMessage = document.getElementById("submitMessage");
    let saveDate = new Date();
    axios.post(apiURL, postBody, authData.config).then(
      (res) => {
        submitMessage.className = "text-success mt-0 mx-5";
        submitMessage.innerText =
          "Save Successful at " + saveDate.toLocaleString();
        let draftData = res.data.draft;
        setCurrentTBSN(draftData.tbsn);
      },
      (rej) => {
        submitMessage.className = "text-danger mt-0 mx-5";
      }
    );
  };

  const uploadImage = (event) => {
    let img = event.target.files[0];
    let binaryData = [];
    binaryData.push(img);
    let url = URL.createObjectURL(
      new Blob(binaryData, { type: "application/zip" })
    );
    setImgURL(url);
    updateCanvas();
  };

  const updateCanvas = () => {
    let canvas = document.getElementById("imgCanvas");
    let ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    let img = document.getElementById("img");
    let watermark = document.getElementById("watermark");
    ctx.drawImage(img, 0, 0, 300, 300);
    ctx.drawImage(watermark, 225, 225, 70, 70);
    let coord = 225 + Math.floor((300 - 225) / 2) - 1;
    ctx.beginPath();
    ctx.arc(coord, coord, 30, 0, 2 * Math.PI, false);
    // ctx.stroke();
  };

  const generatePreview = async () => {
    await savePost();
    let view = <TBookView mode="draft" draftContent={getSubmitBody()} />;
    let previewMessage = document.getElementById("previewMessage");
    setPreviewHTML(view);
    previewMessage.innerText = "Preview generated. Scroll down to view.";
    previewMessage.className = "text-success mt-0 mx-5";
  };

  return (
    <div className="h-100">
      <div className="container h-100 mx-0 px-0 mt-3 w-100">
        <NavBar />
        <div className="row h-100 w-100">
          <div className="col-md-3 col-xs-12" style={{ minWidth: 100 }}>
            <Sidebar active={2} />
          </div>

          <div className="col-xs-12 col-md-9">
            <h1 className="my-5 pt-5 text-center">TSalon Editor</h1>
            <div className="form-group container-fluid px-5 py-4 row">
              <div className="col-xl-5">
                <h4 className="font-weight-normal">Image Cover</h4>
                <canvas id="imgCanvas" height="300" width="300"></canvas>
                <img
                  id="img"
                  src={imgURL}
                  alt="Cover Image"
                  height="300"
                  width="300"
                  onLoad={updateCanvas}
                  style={{ display: "none" }}
                />
                <img
                  id="watermark"
                  src={watermark}
                  style={{ display: "none" }}
                />
                <input
                  id="imgUpload"
                  className="mt-1"
                  type="file"
                  accept="image/png image/jpeg"
                  onChange={uploadImage}
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
            <p id="submitMessage" className="text-danger mt-0 mx-5"></p>
            <p id="previewMessage" className="text-success mt-0 mx-5"></p>
            <div className="row justify-content-center my-5">
              <button
                className="btn btn-primary col-3 mx-3"
                onClick={savePost}
                style={{ borderRadius: 25 }}
              >
                Save Draft
              </button>
              <button
                onClick={generatePreview}
                // onClick={submitPost}
                className="btn btn-warning col-3 mx-3 dropdown-toggle"
                style={{ borderRadius: 25 }}
              >
                Preview
              </button>
            </div>
            <div className="card w-100">
              {previewHTML}
              <div
                className="btn btn-success text-center m-auto mb-4 px-4"
                style={{ borderRadius: 25 }}
                onClick={dangerouslyPublish}
              >
                Submit Draft
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TSalonEditor;
