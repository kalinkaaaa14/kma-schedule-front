import {useState, useRef, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './AddGroup.module.css';

const AddClassTimeForm = () => {
    const [weekDay, setWeekDay] = useState("");
    const [classTime,setClassTime] = useState("");
    const [weekNumber,setWeekNumber] = useState(0);

    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(  () => {
    }, [])


    const submitHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        const response = await fetch("/classtime", {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                weekDay,
                classTime,
                weekNumber
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response);
        response.ok ?  alert("Час додано успішно.") :  alert("Час не було додано. Статус: "+ response.status);

        setWeekDay('');
        setClassTime('');
        setWeekNumber(0);
    };

    return (
        <section className={classes.auth}>
            <h1>Додай новий час</h1>
            <form onSubmit={submitHandler}>

                <div className="form-group">
                    <input name="classTime" id="classTime" type="text" onChange={e => setClassTime(e.target.value)} placeholder="08:30:00" className="form-control"/>
                </div>

                <div className={classes.control}>
                    <label htmlFor='weekDay'>День тижня</label>
                    <select name="weekDay" id="weekDay"   onChange={e => setWeekDay(e.target.value)} >
                        <option key={"MONDAY"} value={'MONDAY'}>понеділок</option>
                        <option key={"TUESDAY"} value={'TUESDAY'}>вівторок</option>
                        <option key={"WEDNESDAY"} value={'WEDNESDAY'}>середа</option>
                        <option key={"THURSDAY"} value={'THURSDAY'}>четвер</option>
                        <option key={"FRIDAY"} value={'FRIDAY'}>п'ятниця</option>
                        <option key={"SATURDAY"} value={'SATURDAY'}>субота</option>
                        <option key={"SUNDAY"} value={'SUNDAY'}>неділя</option>
                    </select>
                </div>

                <div className={classes.control}>
                    <label htmlFor='weekNumber'>Тиждень</label>
                    <select name="weekNumber" defaultValue={1} id="weekNumber" onChange={e => setWeekNumber(Number.parseInt(e.target.value))} >
                        <option key={1} value={1}>1</option>
                        <option key={2} value={2}>2</option>
                        <option key={3} value={3}>3</option>
                        <option key={4} value={4}>4</option>
                        <option key={5} value={5}>5</option>
                        <option key={6} value={6}>6</option>
                        <option key={7} value={7}>7</option>
                        <option key={8} value={8}>8</option>
                        <option key={9} value={9}>9</option>
                        <option key={10} value={10}>10</option>
                        <option key={11} value={11}>11</option>
                        <option key={12} value={12}>12</option>
                        <option key={13} value={13}>13</option>
                        <option key={14} value={14}>14</option>
                    </select>
                </div>

                <div className={classes.actions}>
                    {!isLoading && (
                        <button>Створити час</button>
                    )}
                    {isLoading && <p>Відправляємо дані...</p>}

                </div>
            </form>
        </section>
    );
};

export default AddClassTimeForm;