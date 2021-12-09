import React, {useState, useEffect} from "react";
import RecordsTable from "../components/Records/RecordsTable";

const Records = () => {
    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState(false);
    const getRole = async () => {
       const data = await fetch("/authority");
       const dataJson = await data.json();
       const roles = dataJson.map(role => role.name);
        setUser(roles.includes("USER"));
        setAdmin(roles.includes("ADMIN"));
    }

    useEffect(  () => {
        getRole();
    }, [])

    return (
        <>
        <RecordsTable/>
        </>
    )
};

export default Records;