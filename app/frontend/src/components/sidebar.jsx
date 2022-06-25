import React, { Component } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

function Sidebar(props) {
  const sidebar_options = [
    { index: 0, text: "Collections", link: "#", icon: "fa fa-book" },
    { index: 1, text: "Draft", link: "#", icon: "fa fa-pencil" },
    { index: 2, text: "Review", link: "#", icon: "fa fa-check-to-slot" },
    { index: 2, text: "Settings", link: "#", icon: "fa fa-cog" },
  ];

  const currentActive = props.active || -1;

  return (
    <div className="h-100" style={{ minWidth: 100 }}>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-secondary h-100">
        <a
          href="#"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">
            <i className="fa fa-bars mx-3 mb-4 mt-4"></i>Dashboard
          </span>
        </a>
        <ul className="nav nav-pills flex-column mb-auto">
          {sidebar_options.map((data) => (
            <li key={data.index} className="nav-item my-auto">
              <a
                href={data.link}
                className={
                  data.index === currentActive
                    ? "nav-link active flex-shrink-0"
                    : "nav-link text-white"
                }
                aria-current="page"
              >
                <i className={data.icon + " mx-2"}></i>
                {data.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;