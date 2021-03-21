import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(true);

    let history = useHistory();

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(username)
        console.log(password)
        const url = 'http://localhost:3001/user/authenticateUser';
        let body = { "username": username, "password": password };
        axios.post(url, body)
            .then(result => {
                localStorage.setItem("username", username);
                history.push('/dashboard')
            })
            .catch(error => {
                console.log(error);
                setIsValid(false)
            });
    }

    return (
        <div className="Login">
            {isValid
                ? <Alert variant="success">Please Login</Alert>
                : <Alert variant="danger">User / Password Incorrect</Alert>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="username"
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
                    Login
          </Button>
            </Form>
        </div>
    );
}