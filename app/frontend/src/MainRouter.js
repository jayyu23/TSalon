import React, {Component} from 'react'
import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/home';
import TBook from './components/tbook';

class MainRouter extends Component {
    render() { 
        return ( 
            <div>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/book" element={<TBook/>}/>
                </Routes>
            </div>
        );
    }
}
 
export default MainRouter;