import {useState, useEffect} from 'react';
import classes from './AddGroup.module.css';
import classesAuth from "../Auth/AuthForm.module.css";

const AddLecturerForm = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [lectors, setLectors] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const getLectors = async () => {
        const data = await fetch("/lectors/all");
        const dataJson = await data.json();
        setLectors(dataJson);
    }

    useEffect(() => {
        getLectors();
    }, [])

    const deleteData = id => async () => {
        const res = await fetch(`/lectors/${id}`, { method: 'DELETE'});
        res.ok ? alert("Викладач успішно видалений") : alert("ПОМИЛКА! Перевірте, будь ласка, чи викладач, якого ви видаляєте - не зафіксований у існуючих записах. ")
        await getLectors();
    };

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
        response.ok ? alert("Лектора додано успішно.") : alert("Лектора не було додано. Статус: " + response.status);

        getLectors();
        setName('');
        setMiddlename('');
        setSurname('');
    };

    return (
        <div className={classesAuth.wrapper}>
            <section className={classes.auth}>
                <h1>Додай нового лектора тут</h1>
                <form onSubmit={submitHandler}>

                    <div className="form-group">
                        <input name="lectorName" id="lectorName" type="text" onChange={e => setName(e.target.value)}
                               placeholder="Ім'я" className="form-control"/>
                    </div>

                    <div className="form-group">
                        <input name="lectorSurname" id="lectorSurname" type="text"
                               onChange={e => setSurname(e.target.value)} placeholder="Прізвище"
                               className="form-control"/>
                    </div>

                    <div className="form-group">
                        <input name="lectorMiddlenae" id="lectorMiddlenae" type="text"
                               onChange={e => setMiddlename(e.target.value)} placeholder="По-батькові"
                               className="form-control"/>
                    </div>

                    <div className={classes.actions}>
                        {!isLoading && (
                            <button>Створити лектора</button>
                        )}
                        {isLoading && <p>Відправляємо дані...</p>}

                    </div>
                </form>
            </section>
            <section className={classesAuth.tableWrapper}>
                <table className={classesAuth.disciplineTable}>
                    <tr>
                        <th>Ім'я</th>
                        <th>Прізвище</th>
                        <th>По-батькові</th>
                        <th>Видалити</th>
                    </tr>
                    {(lectors || []).map(i => (
                        <tr key={i.lecturerId}>
                            <td>{i.name}</td>
                            <td>{i.surname}</td>
                            <td>{i.middlename}</td>
                            <td>
                                <div className={classes.actions}>
                                    <button onClick={deleteData(i.lecturerId)}>Видалити</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>
            </section>
        </div>
    );
};

export default AddLecturerForm;