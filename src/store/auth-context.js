import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    roles: [],
    login: (token) => {},
    logout: () => {},
});


const retrieveStoredToken = () => {
    const storedToken = cookies.get('token');

    return {
        token: storedToken
    };
};

export const AuthContextProvider = (props) => {
    const history = useHistory();
    const tokenData = retrieveStoredToken().token;
    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);
    const [roles, setRoles] = useState([]);
    const userIsLoggedIn = !!token;


    const logoutHandler = useCallback(() => {
        setToken(null);
        cookies.remove('token');
        history.replace('/');
    }, []);

    const loginHandler = (token, roles) => {
        setToken(token);
        setRoles(roles);
        cookies.set('token', token);
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        roles: roles,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;