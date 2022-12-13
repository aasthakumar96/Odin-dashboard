import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Navbar from './Navbar/Navbar';
import Report from './Report/Report';






class App extends Component {
   render() {
    return (
      <div className="App">
        <Navbar/>
        <Container>
          
          <Report/>
          
        </Container>  
      </div>
    );
  }
}

export default App;
