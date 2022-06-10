import React, { Component } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import NavBar from "../components/navbar";

class TSalonEditor extends Component {
  // state = {  }  <MUIRichTextEditor/>
  blurbLength = 300;
  imgUrl = "assets/logo_square_orange.png";

  resizeImage() {}

  render() {
    return (
      <div>
        <NavBar />
        <h1 className="my-5 text-center">TSalon Editor</h1>
        <div className="form-group container-fluid px-5 py-4 row">
          <div className="col-lg-4">
            <h4 className="font-weight-normal">Image Cover</h4>
            <img src={this.imgUrl} alt="Cover Image" height="300" width="300" />
            <input
              className="mt-1"
              type="file"
              accept="image/png"
              disabled="true"
            />
            <p className="text-muted mb-3 mt-2">300x300 PNG</p>
          </div>
          <div className="col-lg-8">
            <h4 className="font-weight-normal">Title</h4>
            <input
              className="form-control"
              style={{ fontSize: 32, fontWeight: "bold" }}
            ></input>
            <h4 className="font-weight-normal mt-5">Blurb</h4>
            <textarea
              className="form-control"
              rows="4"
              maxLength={this.blurbLength}
            ></textarea>
            <p className="text-muted mt-1">
              Max Length: {this.blurbLength} characters
            </p>
          </div>
        </div>
        <div className="px-5">
          <h4 className="font-weight-normal pb-2">Content</h4>
          <SunEditor
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
      </div>
    );
  }
}

export default TSalonEditor;
