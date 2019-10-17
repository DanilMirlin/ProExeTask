import React from "react";
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class ModalAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            addUser: {
                id: '',
                name: '',
                username: '',
                email: '',
                address: {
                    street: '',
                    suite: '',
                    city: '',
                    zipcode: '',
                    geo: {
                        lat: '',
                        lng: ''
                    }
                },
                phone: '',
                website: '',
                company: {
                    name: '',
                    catchPhrase: '',
                    bs: ''
                }
            },
            errorMessage: false
        }
    }

    handleClose = () => {
        this.props.handleClose('showAdd');
        this.setState({
            addUser: {
                id: '',
                name: '',
                username: '',
                email: '',
                address: {
                    street: '',
                    suite: '',
                    city: '',
                    zipcode: '',
                    geo: {
                        lat: '',
                        lng: ''
                    }
                },
                phone: '',
                website: '',
                company: {
                    name: '',
                    catchPhrase: '',
                    bs: ''
                }
            },
            errorMessage: false
        })
    };

    submitHandler = (e) => {
        e.preventDefault();
        axios.post('https://jsonplaceholder.typicode.com/user', this.state.addUser)
            .then(response=>{
                console.log(response, response.data)
            })
            .catch(error=>{
            console.log(error.code, error.message);
            this.setState({errorMessage: error.message})
        })
    };

    changeHandler = e => {
        var trg = e.target.name.split('-');
        var mrgd = this.state.addUser;
        switch (trg.length) {
            case 1:
                mrgd[trg[0]]= e.target.value;
                break;
            case 2:
                mrgd[trg[0]][trg[1]]= e.target.value;
                break;
            case 3:
                mrgd[trg[0]][trg[1]][trg[2]]= e.target.value;
                break;
            default:
                break;

        }
        this.setState({addUser: mrgd });
    };

    render() {
        return (
            <Modal show={this.props.showAdd} onHide={this.handleClose} centered size="lg">
                <Form onSubmit={this.submitHandler}>
                    <Alert variant="info" className="text-center font-weight-bold">Add User</Alert>{this.state.errorMessage
                    ? <Alert variant="danger" className="text-center font-weight-bold">{this.state.errorMessage}</Alert>
                    : ''
                }
                    <Modal.Body>
                        <h5>General</h5>
                        <hr/>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label className="small text-uppercase">*Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" required
                                              name="email" value={this.state.addUser.email}
                                              onChange={this.changeHandler}/>
                                <Form.Text><i>*required field</i></Form.Text>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label className="small text-uppercase">*Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your name" required
                                              name="name" value={this.state.addUser.name}
                                              onChange={this.changeHandler}/>
                                <Form.Text><i>*required field</i></Form.Text>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label className="small text-uppercase">Username</Form.Label>
                                <Form.Control placeholder="Username" size="sm"
                                              name="username" value={this.state.addUser.username}
                                              onChange={this.changeHandler}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label className="small text-uppercase">Phone</Form.Label>
                                <Form.Control placeholder="Phone" size="sm"
                                              name="phone" value={this.state.addUser.phone}
                                              onChange={this.changeHandler}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label className="small text-uppercase">Website</Form.Label>
                                <Form.Control placeholder="Website" size="sm"
                                              name="website" value={this.state.addUser.website}
                                              onChange={this.changeHandler}/>
                            </Form.Group>
                        </Form.Row>

                        <h5>Address</h5>
                        <hr/>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label className="small text-uppercase">City</Form.Label>
                                <Form.Control placeholder="City" size="sm"
                                              name="address-city"
                                              value={this.state.addUser.address.city}
                                              onChange={this.changeHandler}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridStreet">
                                <Form.Label className="small text-uppercase">Street</Form.Label>
                                <Form.Control placeholder="1234 Main St" size="sm"
                                              name="address-street"
                                              value={this.state.addUser.address.street}
                                              onChange={this.changeHandler}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridSuite">
                                <Form.Label className="small text-uppercase">Suite</Form.Label>
                                <Form.Control placeholder="Suite 123" size="sm"
                                              name="address-suite"
                                              value={this.state.addUser.address.suite}
                                              onChange={this.changeHandler}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label className="small text-uppercase">Zip</Form.Label>
                                <Form.Control placeholder="Zip code" size="sm"
                                              name="address-zipcode"
                                              value={this.state.addUser.address.zipcode}
                                              onChange={this.changeHandler}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridLat">
                                <Form.Label className="small text-uppercase">Lat</Form.Label>
                                <Form.Control placeholder="Latitude" size="sm"
                                              name="address-geo-lat"
                                              value={this.state.addUser.address.geo.lat}
                                              onChange={this.changeHandler}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLng">
                                <Form.Label className="small text-uppercase">Lng</Form.Label>
                                <Form.Control placeholder="Longitude" size="sm"
                                              name="address-geo-lng"
                                              value={this.state.addUser.address.geo.lng}
                                              onChange={this.changeHandler}/>
                            </Form.Group>
                        </Form.Row>

                        <h5>Company</h5>
                        <hr/>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label className="small text-uppercase">Name</Form.Label>
                                <Form.Control placeholder="Company name" size="sm"
                                              name="company-name"
                                              value={this.state.addUser.company.name}
                                              onChange={this.changeHandler}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridStreet">
                                <Form.Label className="small text-uppercase">catch Phrase</Form.Label>
                                <Form.Control placeholder="catch Phrase" size="sm"
                                              name="company-catchPhrase"
                                              value={this.state.addUser.company.catchPhrase}
                                              onChange={this.changeHandler}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridStreet">
                                <Form.Label className="small text-uppercase">bs</Form.Label>
                                <Form.Control placeholder="bs" size="sm"
                                              name="company-bs"
                                              value={this.state.addUser.company.bs}
                                              onChange={this.changeHandler}/>
                            </Form.Group>
                        </Form.Row>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="info" type="submit">
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default ModalAdd;
