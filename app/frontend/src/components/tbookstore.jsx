import React, { Component } from "react";
import TBook from "./tbook";
import axios from "axios";
import endpoints from "../auth/endpoints";

class TBookStore extends Component {
  constructor(props) {
    super(props);
    this.state = { publications: [] };
  }
  componentDidMount() {
    axios.get(endpoints.getAllPubAPI()).then((pubs) => {
      console.log(pubs);
      this.setState({ publications: pubs.data });
    });
  }

  render() {
    return (
      <div>
        <h1 className="text-center pb-4">TBookstore</h1>
        <div className="row justify-content-center p-3">
          {this.state.publications.map((data) => (
            <TBook
              key={data.tbsn}
              title={data.title}
              blurb={data.blurb}
              author={data.author}
              link={"/view/" + data.tbsn}
              imageCover={data.coverImage}
            />
          ))}
          <TBook />
          <TBook />
          <TBook />
          <TBook />
          <TBook />
        </div>
      </div>
    );
  }
}

export default TBookStore;
