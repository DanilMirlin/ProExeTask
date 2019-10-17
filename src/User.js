import React from 'react';
import axios from 'axios';

import ModalAdd from "./components/ModalAdd";
import ModalEdit from "./components/ModalEdit";
import ModalDelete from "./components/ModalDelete";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //data: [],
            orig: [],
            addUser: [],
            editUser: [],
            delUser: [],
            showAdd: false,
            showEdit: false,
            showDelete: false,
            setShow: false,
            sortUp: false,
            userdata: []
        }
        this.orig = {
            data: []
        }
    }

    handleClose = el => {
        this.setState({[el]: false});
        this.getUsers();
        this.sortUsernames();
    };

    componentDidMount() {
        this.getUsers();
    }

    sortUsernames = () =>{
        this.state.sortUp
            ? this.setState({orig: this.state.orig.sort((a, b) => (b.username > a.username) ? 1 : -1) })
            : this.setState({orig: this.state.orig.sort((a, b) => (a.username > b.username) ? 1 : -1)});
        this.setState({sortUp: !this.state.sortUp});
    };

    getUsers = (noSort) =>{
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                this.setState({orig: response.data});
                this.orig.data = response.data;
            })
            .then(()=>{
               this.sortUsernames();
            })

    };

    addUser = () => {
        console.log('Add User#');
        this.setState({showAdd: true})
    };

    editUser = id => {
        console.log('Edir User#' + id);
        this.setState({editUser: this.state.orig.filter(user => user.id === id)[0]});
        this.setState({showEdit: true})

        console.log('editUser: ', this.state.editUser)
    };

    deleteUser = id => {
        console.log('Delete User#' + id);
        this.setState({delUser: this.state.orig.filter(user => user.id === id)[0]});
        this.setState({showDelete: true})
    };

    changeHandlerAdd = e => {
        this.setState({addUser: {[e.target.name]: e.target.value}})
    };
    changeHandlerEdit = e => {
        this.setState({editUser: {[e.target.name]: e.target.value}})
    }


    render() {

       var usersdata = this.orig.data;

        return (
            <>
                <Card>
                    <Card.Header>
                        <h5 className="float-left">User list</h5>
                        <Button variant="info" onClick={() => this.addUser()} className="float-right">
                            <FontAwesomeIcon icon="user-plus" color="white"/> Add new
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead className="text-center">
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th onClick={()=>this.sortUsernames()} className="sorter">
                                    Username <FontAwesomeIcon icon={'sort-alpha-' + (this.state.sortUp ? 'up' : 'down-alt')} className="float-right"/>
                                </th>
                                <th>City</th>
                                <th>Email</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>

                            {usersdata.map((user, id) => {
                                return (
                                    <tr key={id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.address.city}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Button variant="warning"
                                                    onClick={() => this.editUser(user.id)}>
                                                <FontAwesomeIcon icon="user-edit" color="white"/>
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="danger"
                                                    onClick={() => this.deleteUser(user.id)}>
                                                <FontAwesomeIcon icon="user-times" color="white"/>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}

                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <ModalAdd {...this.state} handleClose={this.handleClose} changeHandler={this.changeHandlerAdd}/>
                <ModalEdit {...this.state} handleClose={this.handleClose} changeHandler={this.changeHandlerEdit}/>
                <ModalDelete {...this.state} handleClose={this.handleClose}/>
            </>
        )
    }

}

export default User ;
