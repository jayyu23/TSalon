import React, { Component } from 'react';
import NavBar from '../components/navbar';
import TBookStore from '../components/tbookstore';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    // state = {  }
    render() { 
        return (
            <div className="App">
              <NavBar />
              <TBookStore />
            </div>
          );
    }
}
 
export default HomePage;