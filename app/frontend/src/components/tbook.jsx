import React, { Component } from 'react';

class TBook extends Component {
    constructor(props) {
      super(props)
      this.state = {
        title: "TSalon Manifesto",
        blurb: "TSalon is a Web 3.0 publishing house and literary salon, providing readers with quality-assured NFT essays called TBooks",
      }
    };
    //state = {  }
    
    TBookTitle = "TSalon Manifesto";
    TBookBlurb = "TSalon is a Web 3.0 publishing house and literary salon, providing readers with quality-assured NFT essays called TBooks";
    TBookAuthor = "Jay Yu";
    images = ['blue', 'green', 'orange', 'purple']

    imageCover = `/assets/logo_square_${this.images[Math.floor(Math.random() * this.images.length)]}.png`

    cardHTML = (<div className="card mx-3" style={{width: "25rem"}}>
    <img className="card-img-top" src={this.imageCover} alt="TBook Image Cap"></img>
    <div className="card-body">
      <h5 className="card-title">{this.TBookTitle}</h5>
      <p className="card-text">{this.TBookBlurb}</p>
      <p className="card-text font-italic">By {this.TBookAuthor}</p>
      <span className="justify-content-center px-5">
          <a href="#" className="btn btn-primary m-2">Read</a>
          <a href="#" className="btn btn-success m-2">Collect</a>
      </span>
      
      
    </div>
  </div>)

    render() { 
        return (this.cardHTML);
    }
}
 
export default TBook;