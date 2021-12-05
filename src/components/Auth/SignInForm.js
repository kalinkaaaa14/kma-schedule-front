import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const SignInForm = () => {
    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        // to - do : Add validation

        setIsLoading(true);

        fetch("http://localhost:8000/sign-in", {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (res) => {
                setIsLoading(false);

                let auth = res.headers.entries().next().value[1];
                let dataToReturn = await res.json();
                dataToReturn.auth = auth;
                if (res.ok) {
                    return dataToReturn;
                } else {
                    return res.json().then((data) => {
                        let errorMessage = 'Authentication failed!';
                        throw new Error(errorMessage);
                    });
                }
            })
            .then((data) => {
                let userRoles = data.roles.map(role => role.name);
                authCtx.login(data.auth, userRoles);
                history.replace('/');
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <section className={classes.auth}>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input
                        type='password'
                        id='password'
                        required
                        ref={passwordInputRef}
                    />
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>Login</button>
                    )}
                    {isLoading && <p>Sending request...</p>}

                </div>
            </form>
        </section>
    );
};

export default SignInForm;