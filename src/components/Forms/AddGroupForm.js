import {useState, useRef, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './AddGroup.module.css';

const AddGroupForm = () => {
    const [specialization, setSpecialization] = useState("ipz");
    const [degree,setDegree] = useState("bachelor");
    const [course,setCourse] = useState(1);
    const [isLecture,setIsLecture] = useState(false);
    const [groupNumber,setGroupNumber] = useState('');
    const [lecturerId,setLecturerId] = useState(1);
    const [lectors,setLectors] = useState([]);

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

        //console.log(lectors);
        // console.log(specialization)
        // console.log(degree)
        // console.log(course)
        // console.log(isLecture)
        // console.log(groupNumber)
        // console.log(lecturerId)
        // console.log("=================================")
        // to - do : Add validation

        setIsLoading(true);


       const response = await fetch("http://localhost:8000/group", {
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
       response.ok ?  alert("Group is added successfully.") :  alert("Adding group FAILED. Status: "+ response.status);

       setSpecialization('ipz');
       setDegree('bachelor');
       setCourse(1);
       setIsLecture(false);
       setGroupNumber('');
       setLecturerId(1);
    };

    return (
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
    );
};

export default AddGroupForm;