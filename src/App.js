import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Records from "./pages/Records";
import AddRecordPage from "./pages/AddRecordPage";
import AddGroupPage from "./pages/AddGroupPage";
import AddDisciplinePage from "./pages/AddDisciplinePage";
import AddLecturerPage from "./pages/AddLecturerPage";
import AddClassroomPage from "./pages/AddClassroomPage";
import AddClassTimeForm from "./components/Forms/AddClassTimeForm";

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
            <Route path='/disciplines' exact>
                <AddDisciplinePage />
            </Route>
            <Route path='/group/add' exact>
                <AddGroupPage />
            </Route>
            <Route path='/lectors/add' exact>
                <AddLecturerPage />
            </Route>
            <Route path='/classroom/add' exact>
                <AddClassroomPage />
            </Route>
            <Route path='/classtime/add' exact>
                <AddClassroomPage />
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