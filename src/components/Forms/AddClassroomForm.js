import {useState, useEffect} from 'react';
import classes from './AddGroup.module.css';
import classesAuth from '../Auth/AuthForm.module.css';

const AddClassroomForm = () => {
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [classrooms, setClassrooms] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const getClassrooms = async () => {
        const data = await fetch("/classroom/all");
        const dataJson = await data.json();
        setClassrooms(dataJson);
    }

    useEffect(() => {
        getClassrooms();
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
        response.ok ? alert("Аудиторію додано успішно.") : alert("Аудиторію не було додано. Статус: " + response.status);
        getClassrooms();
        setName('');
        setCapacity(0);
        setIsLoading(false);
    };

    return (
        <div className={classesAuth.wrapper}>
            <section className={classes.auth}>
                <h1>Додай нову аудиторію тут</h1>
                <form onSubmit={submitHandler}>

                    <div className="form-group">
                        <input name="roomName" id="roomName" type="text" onChange={e => setName(e.target.value)}
                               placeholder="Номер" className="form-control"/>
                    </div>

                    <div className="form-group">
                        <input name="roomCapacity" id="roomCapacity" type="number"
                               onChange={e => setCapacity(Number.parseInt(e.target.value))} placeholder="Місткість"
                               className="form-control"/>
                    </div>

                    <div className={classes.actions}>
                        {!isLoading && (
                            <button>Створити аудиторію</button>
                        )}
                        {isLoading && <p>Відправляємо дані...</p>}

                    </div>
                </form>
            </section>
            <section className={classesAuth.tableWrapper}>
                <table className={classesAuth.disciplineTable}>
                    <tr>
                        <th>Номер</th>
                        <th>Місткість</th>
                    </tr>
                    {(classrooms || []).map(i => (
                        <tr key={i.classroomId}>
                            <td>{i.name}</td>
                            <td>{i.capacity}</td>
                        </tr>
                    ))}
                </table>
            </section>
        </div>
    );
};

export default AddClassroomForm;