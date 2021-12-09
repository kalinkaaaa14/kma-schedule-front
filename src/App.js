import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Records from "./pages/Records";
import AddRecordPage from "./pages/AddRecordPage";

function App() {
  const authCtx = useContext(AuthContext);

  return (
      <Layout>
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
            <Route path='/records' exact>
                <Records />
            </Route>
          {!authCtx.isLoggedIn && (
              <Route path='/sign-in'>
                <SignInPage/>
              </Route>
          )}
            {!authCtx.isLoggedIn && (
                <Route path='/sign-up'>
                   <SignUpPage/>
                </Route>
            )}
                <Route path='/records/add'>
                    <AddRecordPage/>
                </Route>
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Layout>
  );
}

export default App;