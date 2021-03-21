import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function ListUsers() {
    const [users, setUsers] = useState([]);
    let history = useHistory();

    function editUser(id) {
        localStorage.setItem("id", id);
        history.push('/updateuser')
    }
    function deleteUser(id) {
        console.log("Reched here")
        const url = 'http://localhost:3001/user/deleteOneUser';
        let body = { "id": id };
        axios.post(url, body)
            .then(result => {
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
        history.push('/listusers')
    }
    useEffect(() => {
        const url = 'http://localhost:3001/user/';
        axios.get(url)
            .then(result => {
                console.log(result)
                setUsers(Array.from(result.data.data))
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h2 className="text-center">User List</h2>
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">

                    <thead>
                        <tr>
                            <th> User First Name</th>
                            <th> User Last Name</th>
                            <th> User Email Id</th>
                            <th> Username</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(
                                user =>
                                    <tr key={user._id}>
                                        <td> {user.firstName} </td>
                                        <td> {user.lastName}</td>
                                        <td> {user.email}</td>
                                        <td> {user.username}</td>
                                        <td>
                                            <button onClick={() => editUser(user._id)} className="btn btn-info">Update </button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => deleteUser(user._id)} className="btn btn-danger">Delete </button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>

        </div>
    );
}