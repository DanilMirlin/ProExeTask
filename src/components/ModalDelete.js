import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import Form from "react-bootstrap/Form";

class ModalDelete extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show: false,
            errorMessage: false
        }
    }
    handleClose = () => this.props.handleClose('showDelete');

    handleDelete = (e) => {
        e.preventDefault();
        axios.delete('https://jsonplaceholder.typicode.com/user/' + this.props.delUser.id)
            .then(response=>{
                console.log(response, response.data)
            })
            .catch(error=>{
                console.log(error.code, error.message);
                this.setState({errorMessage: error.message})
            })
    };

    render() {

        return(
            <Modal show={this.props.showDelete} onHide={this.handleClose} centered>
                    <Alert variant="danger" className="text-center font-weight-bold">Delete User</Alert>
                {this.state.errorMessage
                    ? <Alert variant="danger" className="text-center font-weight-bold">{this.state.errorMessage}</Alert>
                    : ''
                }
                <Modal.Body className="text-center">
                    <h2>Are you sure?</h2>
                    <p className="pt-5">Information about <b className='text-uppercase'>{this.props.delUser.name}</b> will be deleted from database forever...</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Nope
                    </Button>
                    <Button variant="danger" onClick={this.handleDelete}>
                        Sure, delete
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalDelete;
