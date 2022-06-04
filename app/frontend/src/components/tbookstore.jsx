import React, { Component } from 'react';
import TBook from './tbook';

class TBookStore extends Component {
    //state = {  } 
    
    render() { 
        return (
            <div>
                <h1 className="text-center">TBookstore</h1>
                <div className="row justify-content-center p-3">
                    <TBook/>
                    <TBook/>
                    <TBook/>
                    <TBook/>
                    <TBook/>
                    <TBook/>
                    <TBook/>
                    <TBook/>
                </div>
            </div>
        );
    }
}
 
export default TBookStore;