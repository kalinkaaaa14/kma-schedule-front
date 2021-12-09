import {useState, useRef, useContext, useEffect} from 'react';
import AuthContext from '../../store/auth-context';
import classes from './AddGroup.module.css';

const AddDisciplineForm = () => {

    const [name, setName] = useState('');
    const [lectors,setLectors] = useState([]);
    const [lecturerId,setLecturerId] = useState(1);

    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);


    const getLectors = async () => {
        const data = await fetch("/lectors/all");
        const dataJson = await data.json();
        setLectors(dataJson);
    }

    useEffect(  () => {
        getLectors();
    }, [])


    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(name);
        console.log(lectors);
        console.log(lecturerId)

        // to - do : Add validation

        setIsLoading(true);


        const response = await fetch("http://localhost:8000/disciplines", {
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

        console.log(response);
        response.ok ?  alert("Group is added successfully.") :  alert("Adding group FAILED. Status: "+ response.status);

        setName('');
        setLecturerId(1);
    };

    return (
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
    );
};

export default AddDisciplineForm;