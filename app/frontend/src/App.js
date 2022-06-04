import logo from './logo.svg';
import navBar from './components/navbar.jsx';
import { Component } from 'react';
import NavBar from './components/navbar';
import TBook from './components/tbook';
import { ReactDOM } from 'react';
import TBookStore from './components/tbookstore';

class App extends Component {
  constructor (props) {
    super(props)
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

export default App;