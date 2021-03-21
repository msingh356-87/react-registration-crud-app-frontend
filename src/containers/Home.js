import React from "react";
import "./Home.css";
import Button from "react-bootstrap/Button";
import { useHistory } from 'react-router-dom';

export default function Home() {
  let history = useHistory();

  const login = () => {
    history.push('/login')
  }

  const register = () => {
    history.push('/register')
  }
  const listUsers = () => {
    history.push('/listusers')
  }
  return (
    <div className="Home">
      <div className="lander">
        <h1>Registration Crud</h1>
        <p className="text-muted">A simple registration crud app</p>
      </div>
      <Button block size="sm" onClick={login}>
        Login
          </Button>
      <Button block size="sm" onClick={register}>
        Register
          </Button>
      <Button block size="sm"  onClick={listUsers}>
        List Users
          </Button>
    </div>
  );
}