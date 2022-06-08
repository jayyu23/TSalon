import React, { Component } from "react";
import TBook from "./tbook";

const apiContent = [
  {
    id: 1,
    title: "Wittgenstein’s Clockface Problem",
    blurb: "Article 1 blurb",
    author: "Jay Yu",
    link: "https://www.google.com",
  },
  {
    id: 2,
    title: "The Blue Book",
    blurb: "Article 2 blurb",
    author: "Jay Yu",
    link: "https://www.google.com",
  },
  {
    id: 3,
    title: "The Buddhas Dao and Platos Li",
    blurb: "Article 3 blurb",
    author: "Jay Yu",
    link: "https://www.google.com",
  },
  {
    id: 4,
    title: "陋室铭",
    blurb: "Article 4 blurb",
    author: "Jay Yu",
    link: "https://www.google.com",
  },
];

class TBookStore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //state = {  }

  render() {
    return (
      <div>
        <h1 className="text-center pb-4">TBookstore</h1>
        <div className="row justify-content-center p-3">
          {apiContent.map((data) => (
            <TBook
              key={data.id}
              title={data.title}
              blurb={data.blurb}
              author={data.author}
              link={data.link}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default TBookStore;
