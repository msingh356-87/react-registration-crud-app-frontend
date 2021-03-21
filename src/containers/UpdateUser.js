import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

export default function UpdateUser() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();
    const [isValid, setIsValid] = useState(true);
    const [id, setId] = useState("");

    useEffect(() => {
        setId(localStorage.getItem("id"));
        let idFromPage = localStorage.getItem("id")
        const url = 'http://localhost:3001/user/getUserById';
        let body = { "id": idFromPage };
        axios.post(url, body)
            .then(result => {
                setFirstName(result.data.data.firstName);
                setLastName(result.data.data.lastName);
                setEmail(result.data.data.email);
                setUsername(result.data.data.username);
            })
            .catch(error => {
                console.log(error);
                setIsValid(false)
            });
    }, []);


    function handleSubmit(event) {
        event.preventDefault();
        const url = 'http://localhost:3001/user/updateUser';
        let body = { "id": id, "firstName": firstName, "lastName": lastName, "email": email, "username": username, "password": password };
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
                ? <Alert variant="success">Please Update User</Alert>
                : <Alert variant="danger">User Not Saved</Alert>
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
                <Button block size="lg" type="submit" >
                    Register
          </Button>
            </Form>
        </div>
    );
}
