import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();
    const [isValid, setIsValid] = useState(true);

    function validateForm() {
        return email.length > 0 && password.length > 0 && username.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const url = 'http://localhost:3001/user/registerUser';
        let body = { "firstName": firstName, "lastName": lastName, "email": email, "username": username, "password": password };
        axios.post(url, body)
            .then(result => {
                history.push('/')
            })
            .catch(error => {
                console.log(error);
                setIsValid(false)
            });
    }

    return (
        <div className="Login">
            {isValid
                ? <Alert variant="success">Please Register</Alert>
                : <Alert variant="danger">User Not Registered</Alert>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        autoFocus
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        autoFocus
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Register
          </Button>
            </Form>
        </div>
    );
}
