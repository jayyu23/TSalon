import React, { Component } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import NavBar from "../components/navbar";

class TSalonEditor extends Component {
  // state = {  }  <MUIRichTextEditor/>
  render() {
    return (
      <div>
        <NavBar />
        <h1 className="my-5 text-center">TSalon Editor</h1>
        <div className="px-5">
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
