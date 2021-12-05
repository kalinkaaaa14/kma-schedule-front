import React, { useState, useCallback } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    roles: [],
    login: (token) => {},
    logout: () => {},
});


const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');

    return {
        token: storedToken
    };
};

export const AuthContextProvider = (props) => {
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
        localStorage.removeItem('token');
    }, []);

    const loginHandler = (token, roles) => {
        setToken(token);
        setRoles(roles);
        localStorage.setItem('token', token);
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