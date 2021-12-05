import React, {useState, useEffect} from "react";
import {isAdmin, isRegisteredUser} from "../hooks/getRole";

const HomePage = () => {
    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState(false);

    useEffect(() => {
        setAdmin(isAdmin())
        setUser(isRegisteredUser())
    }, [])

    return (<div>{ admin ? (<div>IT IS ADMIN</div>) : (<div>IT IS REGULAR USER</div>)}</div>);
};

export default HomePage;