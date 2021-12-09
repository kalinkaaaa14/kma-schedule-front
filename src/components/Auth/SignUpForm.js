import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './AuthForm.module.css';

const SignUpForm = () => {
    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const usernameInputRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredUsername = usernameInputRef.current.value;
        // to - do: Add validation

        setIsLoading(true);
        fetch("http://localhost:8000/sign-up", {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                username:enteredUsername,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    history.replace('/sign-in');
                } else {
                    return res.json().then((data) => {
                        let errorMessage = 'Authentication failed!';
                        throw new Error(errorMessage);
                    });
                }
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <section className={classes.auth}>
            <h1>Реєстрація</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='username'>Ваш юзернейм</label>
                    <input type='text' id='username' required ref={usernameInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='email'>Ваш мейл</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Ваш пароль</label>
                    <input
                        type='password'
                        id='password'
                        required
                        ref={passwordInputRef}
                    />
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>Зареєструватись</button>
                    )}
                    {isLoading && <p>Надсилаємо запит...</p>}
                </div>
            </form>
        </section>
    );
};

export default SignUpForm;