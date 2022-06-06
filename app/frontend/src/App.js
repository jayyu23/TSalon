import React, {Component} from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import HomePage from './pages/home';
import TBook from './components/tbook';
import TSalonEditor from './pages/editor';

class App extends Component {
  constructor (props) {
    super(props)
  }
  // state = {  } 
  render() { 
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/book" element={<TBook/>}/>
          <Route path="/editor" element={<TSalonEditor/>}/>
        </Routes>
     </BrowserRouter>
    );
  }
}

export default App;