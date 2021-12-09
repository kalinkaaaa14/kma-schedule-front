import {useState, useRef, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './AddGroup.module.css';

const AddClassroomForm = () => {
    const [name, setName] = useState("");
    const [capacity,setCapacity] = useState(0);

    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(  () => {
    }, [])


    const submitHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        const response = await fetch("/classroom", {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                name,
                capacity
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response);
        response.ok ?  alert("Аудиторію додано успішно.") :  alert("Аудиторію не було додано. Статус: "+ response.status);

        setName('');
        setCapacity(0);
    };

    return (
        <section className={classes.auth}>
            <h1>Додай нову аудиторію тут</h1>
            <form onSubmit={submitHandler}>

                <div className="form-group">
                    <input name="roomName" id="roomName" type="text" onChange={e => setName(e.target.value)} placeholder="Номер" className="form-control"/>
                </div>

                <div className="form-group">
                    <input name="roomCapacity" id="roomCapacity" type="number" onChange={e => setCapacity(Number.parseInt(e.target.value))} placeholder="Місткість" className="form-control"/>
                </div>

                <div className={classes.actions}>
                    {!isLoading && (
                        <button>Створити аудиторію</button>
                    )}
                    {isLoading && <p>Відправляємо дані...</p>}

                </div>
            </form>
        </section>
    );
};

export default AddClassroomForm;