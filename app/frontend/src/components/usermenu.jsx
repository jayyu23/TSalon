import React, { Component } from "react";
import NavBar from "./navbar";

const sidebar_options = [
  { index: 0, text: "TBookshelf", link: "#" },
  { index: 1, text: "My Drafts", link: "#" },
  { index: 2, text: "TBookshelf", link: "#" },
];

var active = 0;

class UserMenu extends Component {
  //state = {  }
  generateSidebar() {
    let currentActive = this.props.active ? this.props.actives : active;
    let sidebarBase = (
      <div>
        <div
          className="d-flex flex-column flex-shrink-0 p-3 bg-light h-100"
          style={{ width: 280, minHeight: "100pct" }}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none w-100 h-100"
          >
            <span className="fs-4 py-4 h3 mt-4 h-100">Dashboard</span>
          </a>
          <ul className="nav nav-pills flex-column mb-auto h-100">
            {sidebar_options.map((data) => (
              <li key={data.index} className="nav-item my-2">
                <a
                  href={data.link}
                  className={
                    data.index === currentActive
                      ? "nav-link active"
                      : "nav-link"
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
