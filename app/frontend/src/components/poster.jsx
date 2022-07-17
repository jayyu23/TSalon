import React, { Component } from "react";

function Poster(props) {
  const imgUrl = "/assets/cafedeflore.jpg";
  const logoURL = "/assets/logo_circle.png";
  return (
    <div>
      <div
        className="vh-100 mt-0 p-0 justify-content-center pb-3"
        style={{ backgroundImage: `url(${imgUrl})` }}
      >
        <div className="w-100 justify-content-center text-center mt-5 pt-5">
          <img src={logoURL} alt="" />
        </div>
        <h1 className="text-white text-center mt-0" style={{ fontSize: 90 }}>
          TSalon
        </h1>
        <p
          className="subheading my-4 text-white text-center"
          style={{ fontSize: 36, fontFamily: "Avenir" }}
        >
          A Web 3.0 Publishing House
        </p>
        <div className="justify-content-center text-center">
          <a
            href="#store"
            className="btn btn-success my-5 ml-5 px-5"
            style={{
              fontSize: 28,
              fontFamily: "Avenir",
              borderRadius: 100,
            }}
          >
            Explore
            <i className="fa fa-arrow-right px-2" style={{ fontSize: 25 }}></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Poster;

// class NavBar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { showImage: "false" };
//   }
//   imgUrl = "/assets/cafedeflore.jpg";
//   logoUrl = "/assets/logo_circle.png";
//   baseNavBar = "navbar navbar-expand-lg fixed-top";

//   getNavBarHTML(showImage) {
//     let darkHeader = " navbar-dark bg-dark";
//     let lightHeader = " navbar-light";
//     let modifier = showImage === "true" ? lightHeader : darkHeader;

//     let navbarHTML = (
//       <nav
//         className={"navbar navbar-expand-lg fixed-top" + modifier}
//         id="mainNav"
//       >
//         <div className="container px-4 px-lg">
//           <img
//             className="navbar-brand m-x-2 d-inline-block align-top"
//             src={this.logoUrl}
//             width="45px"
//           ></img>
//           <a className="navbar-brand" href="/">
//             TSalon
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarResponsive"
//             aria-controls="navbarResponsive"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             Menu
//             <i className="fas fa-bars"></i>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarResponsive">
//             <ul className="navbar-nav ms-auto py-4 py-lg-0">
//               <li className="nav-item">
//                 <a className="nav-link px-lg-3 py-3 py-lg-4" href="/login">
//                   Login
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   className="nav-link px-lg-3 py-3 py-lg-4"
//                   target="_blank"
//                   href="https://trapezoidal-nephew-39b.notion.site/TSalon-Whitepaper-9d27f5c901bc4dcaa53bace710421fce"
//                 >
//                   Whitepaper
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   className="nav-link px-lg-3 py-3 py-lg-4"
//                   target="_blank"
//                   href="https://discord.gg/jABTq5RPNC"
//                 >
//                   Join Discord
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     );
//     return navbarHTML;
//   }

//   bgImageHTML = (
//     <header
//       className="masthead"
//       style={{ backgroundImage: `url(${this.imgUrl})` }}
//     >
//       <div className="container position-relative px-4 px-lg-5">
//         <div className="row gx-4 gx-lg-5 justify-content-center">
//           <div className="col-md-10 col-lg-8 col-xl-7">
//             <div className="page-heading">
//               <h1>TSalon</h1>
//               <span className="subheading mb-5">
//                 A Web 3.0 Publishing House
//               </span>
//               <a
//                 className="btn btn-primary mt-lg-3 px-lg-4 mb-3"
//                 style={{ borderRadius: 15 }}
//                 href="https://discord.gg/jABTq5RPNC"
//                 target="_blank"
//               >
//                 Join the Discord
//               </a>
//               <a
//                 className="btn btn-success mt-lg-3 px-lg-3 mx-2 mb-3"
//                 style={{ borderRadius: 15 }}
//                 target="_blank"
//                 href="https://trapezoidal-nephew-39b.notion.site/TSalon-Whitepaper-9d27f5c901bc4dcaa53bace710421fce"
//               >
//                 Read the Whitepaper
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );

//   render() {
//     let outHTML = "";
//     let showImage = this.props.showImage
//       ? this.props.showImage
//       : this.state.showImage;

//     if (showImage === "true") {
//       outHTML = (
//         <div id="navBarHeader">
//           {this.getNavBarHTML(showImage)} {this.bgImageHTML}
//         </div>
//       );
//     } else {
//       outHTML = (
//         <div id="navBarHeader">
//           {this.getNavBarHTML(showImage)}
//           <div style={{ paddingTop: 50 }}></div>
//         </div>
//       );
//     }
//     return outHTML;
//   }
// }

// export default NavBar;
