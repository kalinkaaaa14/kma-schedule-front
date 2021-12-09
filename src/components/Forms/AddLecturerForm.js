import {useState, useRef, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './AddGroup.module.css';

const AddLecturerForm = () => {
    const [name, setName] = useState("");
    const [surname,setSurname] = useState("");
    const [middlename,setMiddlename] = useState("");

    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(  () => {
    }, [])


    const submitHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true);


        const response = await fetch("/lectors", {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                name,
                surname,
                middlename
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response);
        response.ok ?  alert("Лектора додано успішно.") :  alert("Лектора не було додано. Статус: "+ response.status);

        setName('');
        setMiddlename('');
        setSurname('');
    };

    return (
        <section className={classes.auth}>
            <h1>Додай нового лектора тут</h1>
            <form onSubmit={submitHandler}>

                <div className="form-group">
                    <input name="lectorName" id="lectorName" type="text" onChange={e => setName(e.target.value)} placeholder="Ім'я" className="form-control"/>
                </div>

                <div className="form-group">
                    <input name="lectorSurname" id="lectorSurname" type="text" onChange={e => setSurname(e.target.value)} placeholder="Прізвище" className="form-control"/>
                </div>

                <div className="form-group">
                    <input name="lectorMiddlenae" id="lectorMiddlenae" type="text" onChange={e => setMiddlename(e.target.value)} placeholder="По-батькові" className="form-control"/>
                </div>

                <div className={classes.actions}>
                    {!isLoading && (
                        <button>Створити лектора</button>
                    )}
                    {isLoading && <p>Відправляємо дані...</p>}

                </div>
            </form>
        </section>
    );
};

export default AddLecturerForm;