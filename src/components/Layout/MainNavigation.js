import {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css'
const MainNavigation = () => {
    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;
    const roles = authCtx.roles;

    const logoutHandler = () => {
        authCtx.logout();
    };

    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState(false);
    const getRole = async () => {
        const data = await fetch("/authority");
        const dataJson = await data.json();
        if(!dataJson.hasOwnProperty('error')) {
            const roles = dataJson.map(role => role.name);
            setUser(roles.includes("USER"));
            setAdmin(roles.includes("ADMIN"));
        }
    }

    useEffect(  () => {
        getRole();
    }, [])

    return (
        <header className={classes.header}>
            <Link to='/'>
                <div className={classes.logo}>KMA Scheduler</div>
            </Link>
            <nav>
                <ul>
                    {!admin && !user && (
                        <li>
                            <Link to='/sign-in'>Sign in</Link>
                        </li>
                    )}
                    {!admin && !user && (
                        <li>
                            <Link to='/sign-up'>Sign up</Link>
                        </li>
                    )}
                    {(admin || user) &&(
                        <li>
                            <Link to='/records'>Records</Link>
                        </li>
                    )}

                    {admin &&
                        <li>                            <div className={classes.dropdown}>
                                <button className={classes.dropbtn}>Dropdown
                                    <i className="fa fa-caret-down"/>
                                </button>
                                <div className={classes.dropdownContent}>
                                    <a href="/records/add">Add records</a>
                                    <a href="/disciplines">Add disciplines</a>
                                    <a href="/group/add">Add groups</a>
                                    <a href="/lectors">Add lectors</a>
                                    <a href="/classtime">Add classtime</a>
                                    <a href="/classroom">Add classroom</a>
                                </div>
                            </div>
                        </li>
                    }
                    {(admin || user) &&  (
                        <li>
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;