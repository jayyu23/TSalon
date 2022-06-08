import React, { Component } from "react";
import NavBar from "./navbar";
import parse from "html-react-parser";
import sanitizeHTML from "sanitize-html";

class TBookView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "0x37849ab462373828c621de",
      coverImage: "/assets/logo_square_blue.png",
      title: "TSalon Manifesto",
      html: "<h3>Heya, you're an allstar!</h3><p>Am I right or am i right!!!!</p>",
    };
  }
  state = {};

  getBodyHTML() {
    let rawHTML = this.props.html ? this.props.html : this.state.html;
    // Prevent XSS attacks
    let bodyHTML = sanitizeHTML(rawHTML);
    return bodyHTML;
  }

  render() {
    return (
      <div>
        <div className="text-center justify-content-center">
          <h1 className="mt-4 mb-2">{this.state.title}</h1>
          <p className="font-italic">By: {this.state.author}</p>
          <img
            className="mt-3"
            src={this.state.coverImage}
            alt="Cover Image for Article"
          />
          <div className="my-4">{parse(this.getBodyHTML())}</div>
        </div>
      </div>
    );
  }
}

export default TBookView;
