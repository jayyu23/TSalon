import React, { Component } from "react";
import NavBar from "./navbar";

const sidebar_options = [
  { index: 0, text: "TBookshelf", link: "#" },
  { index: 1, text: "My Drafts", link: "#" },
  { index: 2, text: "TBookshelf", link: "#" },
];

var active = 1;

class UserMenu extends Component {
  //state = {  }
  generateSidebar() {
    let sidebarBase = (
      <div>
        <NavBar />
        <div
          className="d-flex flex-column flex-shrink-0 p-3 text-white bg-secondary vh-100"
          style={{ width: 280, height: "100%" }}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none w-100"
          >
            <span className="fs-4 py-4 h3 mt-4">Dashboard</span>
          </a>
          <ul className="nav nav-pills flex-column mb-auto">
            {sidebar_options.map((data) => (
              <li key={data.index} className="nav-item my-2">
                <a
                  href={data.link}
                  className={
                    data.index === active
                      ? "nav-link active"
                      : "nav-link text-white"
                  }
                  aria-current="page"
                >
                  {data.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
    return sidebarBase;
  }

  render() {
    return this.generateSidebar();
  }
}

export default UserMenu;
