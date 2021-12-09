import {useState, useEffect} from 'react';
import classes from '../Auth/AuthForm.module.css';

const AddDisciplineForm = () => {

    const [name, setName] = useState('');
    const [lectors,setLectors] = useState([]);
    const [lecturerId, setLecturerId] = useState(1);
    const [disciplines, setDisciplines] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getLectors = async () => {
        const data = await fetch("/lectors/all");
        const dataJson = await data.json();
        setLectors(dataJson);
    }
    const getDisciplines = async () => {
        const data = await fetch("/disciplines");
        const dataJson = await data.json();
        setDisciplines(dataJson);
    }

    const deleteDiscipline = async (id) => {
        const response = await fetch("/disciplines/"+id, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        response.ok ?  alert("Дисципліна успішно видалена.") :  alert("Дисципліну не було видалено. Status: "+ response.status);
    }

    useEffect(  () => {
        getLectors();
        getDisciplines();
    }, [])


    const submitHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        const response = await fetch("/disciplines", {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
              name,
                lecturerId
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        response.ok ?  alert("Дисципліна успішно додано.") :  alert("Дисципліну не було додано. Status: "+ response.status);
        setName('');
        setLecturerId(1);
        setIsLoading(false);
    };

    return (
        <div className={classes.wrapper}>
            <section className={classes.auth}>
                <h1>Додай нову дисципліну тут</h1>
                <form onSubmit={submitHandler}>

                    <div className="form-group">
                        <textarea type="text" name="name" id="name" placeholder="Назва" className="form-control" onChange={e => setName(e.target.value)}/>
                    </div>

                    <div className={classes.control}>
                        <label htmlFor='lector'>Лектор</label>
                        <select name="lector" id="lector" onChange={e => setLecturerId(e.target.value)}>
                            {(lectors || []).map(lector => (
                                <option value={lector.lecturerId} key={lector.lecturerId}>
                                    {lector.surname + ' ' + lector.name + ' '+ lector.middlename}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={classes.actions}>
                        {!isLoading && (
                            <button>Створити групу</button>
                        )}
                        {isLoading && <p>Відправляємо дані...</p>}

                    </div>
                </form>
            </section>
            <section className={classes.tableWrapper}>
                <table className={classes.disciplineTable}>
                    <tr>
                        <th>Предмет</th>
                        <th>Лектор</th>
                    </tr>
                    {(disciplines || []).map(i => (
                        <tr key={i.disciplineId}>
                            <td>{i.name}</td>
                            <td>{lectors.filter(l => l.lecturerId === i.lecturerId).map(l => (l.surname + ' ' + l.name + ' '+ l.middlename))}</td>
                        </tr>
                    ))}
                </table>
            </section>
        </div>
    );
};

export default AddDisciplineForm;