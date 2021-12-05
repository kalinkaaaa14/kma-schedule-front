import {Fragment, useContext} from 'react';

import MainNavigation from './MainNavigation';
import AuthContext from "../../store/auth-context";

const Layout = (props) => {

    return (
        <Fragment>
           <MainNavigation/>
            <main>{props.children}</main>
        </Fragment>
    );
};

export default Layout;