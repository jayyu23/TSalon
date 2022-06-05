import React, { Component } from 'react';

class TBook extends Component {
    constructor(props) {
      super(props)
      this.state = {
        defaultTitle: "TSalon Publication",
        defaultBlurb: "TSalon is a Web 3.0 publishing house and literary salon, providing readers with quality-assured NFT essays called TBooks",
        defaultAuthor: "Anonymous",
        defaultLink: "#"
      }
    };

    images = ['blue', 'green', 'orange', 'purple']
    imageCover = `/assets/logo_square_${this.images[Math.floor(Math.random() * this.images.length)]}.png`

    cardHTML() {
      let card = (<div className="card mx-3" style={{width: "25rem"}}>
        <img className="card-img-top" src={(this.props.imageCover) ? this.props.imageCover : this.imageCover} alt="TBook Image Cap"></img>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{(this.props.title) ? this.props.title : this.state.defaultTitle}</h5>
          <p className="card-text">{(this.props.blurb) ? this.props.blurb : this.state.defaultBlurb}</p>
          <p className="card-text font-italic">By {(this.props.author) ? this.props.author : this.state.defaultAuthor}</p>
          <span className="px-5 mt-auto">
              <a href={(this.props.link) ? this.props.link : this.state.defaultLink} className="btn btn-primary m-2 px-auto">Read</a>
              <a href="#" className="btn btn-success m-2 px-auto">Collect</a>
          </span>
        </div>
      </div>)
    return card;
    }

    render() {
        return (this.cardHTML());
    }
}
 
export default TBook;