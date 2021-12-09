import {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css'
const MainNavigation = () => {
    const authCtx = useContext(AuthContext);

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
                            <Link to='/sign-in'>Ввійти</Link>
                        </li>
                    )}
                    {!admin && !user && (
                        <li>
                            <Link to='/sign-up'>Зареєструватися</Link>
                        </li>
                    )}
                    {(admin || user) &&(
                        <li>
                            <a href='/records'>Записи</a>
                        </li>
                    )}

                    {admin &&
                    (
                        <>
                            <li>
                                <a href="/records/add">+Запис</a>
                            </li>
                            <li>
                                <a href="/disciplines">+Дисципліна</a>
                            </li>
                            <li>
                                <a href="/group/add">+Група</a>
                            </li>
                            <li>
                                <a href="/lectors/add">+Викладач</a>
                            </li>
                            <li>
                                <a href="/classtime/add">+Час</a>
                            </li>
                            <li>
                                <a href="/classroom/add">+Кабінет</a>
                            </li>
                        </>
                    )
                    }
                    {(admin || user) &&  (
                        <li>
                            <button onClick={logoutHandler}>Вихід</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;