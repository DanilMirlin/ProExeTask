import React, {Component} from 'react'
import './App.css'
import User from './User'

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";


class App extends Component {
    render() {
        return (
            <Container className="App p-3">
                <Jumbotron className="p-3">
                    <h3>Dashboard</h3>
                    <User/>
                </Jumbotron>
            </Container>
        );
    }
}
export default App
