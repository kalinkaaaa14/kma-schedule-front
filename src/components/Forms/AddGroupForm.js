import {useState, useEffect} from 'react';
import classes from './AddGroup.module.css';
import classesAuth from '../Auth/AuthForm.module.css';

const AddGroupForm = () => {
    const [specialization, setSpecialization] = useState("ipz");
    const [degree,setDegree] = useState("bachelor");
    const [course,setCourse] = useState(1);
    const [isLecture,setIsLecture] = useState(false);
    const [groupNumber,setGroupNumber] = useState('');
    const [lecturerId,setLecturerId] = useState(1);
    const [lectors,setLectors] = useState([]);
    const [groups, setGroups] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const getLectors = async () => {
        const data = await fetch("/lectors/all");
        const dataJson = await data.json();
        setLectors(dataJson);
    }
    const getGroups = async () => {
        const data = await fetch("/group/all");
        const dataJson = await data.json();
        setGroups(dataJson);
    }

    useEffect(  () => {
        getLectors();
        getGroups();
    }, [])


    const deleteData = id => async () => {
        const res = await fetch(`/group/${id}`, { method: 'DELETE'});
        res.ok ? alert("Групу успішно видалено") : alert("ПОМИЛКА! Перевірте, будь ласка, чи група, яку ви видаляєте - не зафіксована у існуючих записах. ")
        await getLectors();
        await getGroups();
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true);

       const response = await fetch("/group", {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                isLecture,
                specialization,
                degree,
                course,
                groupNumber,
                lecturerId
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

       console.log(response);
       response.ok ?  alert("Групу успішно додано.") :  alert("Групу не було додано. Status: "+ response.status);
       getGroups();
       setSpecialization('ipz');
       setDegree('bachelor');
       setCourse(1);
       setIsLecture(false);
       setGroupNumber('');
       setLecturerId(1);
       setIsLoading(false);
    };

    return (
        <div className={classesAuth.wrapper}>
            <section className={classes.auth}>
            <h1>Додай нову групу тут</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='specialization'>Спеціальність</label>
                    <select name="specialization" id="specialization"   onChange={e => setSpecialization(e.target.value)} >
                        <option key={"ipz"} value={'ipz'}>ІПЗ</option>
                        <option key={"kn"} value={'kn'}>КН</option>
                        <option key={"pm"} value={'pm'}>ПМ</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='degree'>Ступінь</label>
                    <select name="degree" id="degree" onChange={e => setDegree(e.target.value)} >
                        <option key={"bachelor"} value={'bachelor'}>Бакалавр</option>
                        <option key={"master"} value={'master'}>Магістр</option>
                    </select>
                </div>

                <div className={classes.control}>
                    <label htmlFor='course'>Курс</label>
                    <select name="course" defaultValue={1} id="course" onChange={e => setCourse(e.target.value)} >
                        <option key={1} value={1}>1</option>
                        <option key={2} value={2}>2</option>
                        <option key={3} value={3}>3</option>
                        <option key={4} value={4}>4</option>
                        <option key={5} value={5}>5</option>
                        <option key={6} value={6}>6</option>
                    </select>
                </div>

                <div className="form-check" style={{display: "inline-block"}}>
                    <input name="isLecture" onChange={e => setIsLecture(e.target.checked)} className="form-check-input" type="checkbox" value="" id="isLecture"/>
                </div>

                <div className="form-group">
                    <input name="groupNumber" id="groupNumber" type="number" onChange={e => setGroupNumber(e.target.value)} placeholder="Номер групи" className="form-control"/>
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
            <section className={classesAuth.tableWrapper}>
                <table className={classesAuth.disciplineTable}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Ступінь</th>
                        <th>Спеціальність</th>
                        <th>Курс</th>
                        <th>Лектор</th>
                        <th>Лекція?</th>
                        <th>Видалити</th>
                        <th>Оновити</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(groups || []).map(i => (
                        <tr key={i.id}>
                            <td>{i.groupNumber}</td>
                            <td>{i.degree === ('bachelor' || 'бакалавр') ? 'бакалавр' : 'магістр'}</td>
                            <td>{i.specialization}</td>
                            <td>{i.course}</td>
                            <td>{lectors.filter(l => l.lecturerId === i.lecturerId).map(l => (l.surname + ' ' + l.name + ' '+ l.middlename))}</td>
                            <td>{i.isLecture ? 'Так' : 'Ні'}</td>
                            <td>
                                    <div className={classes.actions}>
                                        <button onClick={deleteData(i.id)}>Видалити</button>
                                    </div>
                            </td>
                            <td>
                                <div className={classes.actions}>
                                    <button onClick={deleteData(i.id)}>Оновити</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AddGroupForm;