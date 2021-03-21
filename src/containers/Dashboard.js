import React, { useState ,useEffect} from "react";

export default function Dashboard() {
    const [username, setUsername] = useState("");
    useEffect(() => {
        setUsername(localStorage.getItem("username"));

    }, []);
    return (
        <div className="Dashboard">
            Welcome User, {username}
        </div>
    )
}