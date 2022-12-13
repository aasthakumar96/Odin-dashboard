import React from 'react';
import { Navbar } from 'react-bootstrap';

const navbar = () => {
    return(
        <Navbar bg="secondary" variant="dark">
            <Navbar.Brand href="#home">
            
             Odin Inspector
            </Navbar.Brand>
        </Navbar>
    )
}

export default navbar;