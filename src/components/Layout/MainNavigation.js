import { useContext } from 'react';
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

    return (
        <header className={classes.header}>
            <Link to='/'>
                <div className={classes.logo}>KMA Scheduler</div>
            </Link>
            <nav>
                <ul>
                    {!isLoggedIn && (
                        <li>
                            <Link to='/sign-in'>Sign in</Link>
                        </li>
                    )}
                    {!isLoggedIn && (
                        <li>
                            <Link to='/sign-up'>Sign up</Link>
                        </li>
                    )}
                    {isLoggedIn &&(
                        <li>
                            <Link to='/records'>Records</Link>
                        </li>
                    )}
                    {isLoggedIn && roles.includes("ADMIN") &&
                        <li>                            <div className={classes.dropdown}>
                                <button className={classes.dropbtn}>Dropdown
                                    <i className="fa fa-caret-down"/>
                                </button>
                                <div className={classes.dropdownContent}>
                                    <a href="/records/add">Add records</a>
                                    <a href="/disciplines">Add disciplines</a>
                                    <a href="/group">Add groups</a>
                                    <a href="/lectors">Add lectors</a>
                                    <a href="/classtime">Add classtime</a>
                                    <a href="/classroom">Add classroom</a>
                                </div>
                            </div>
                        </li>
                    }
                    {isLoggedIn &&  (
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