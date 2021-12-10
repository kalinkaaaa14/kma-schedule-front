import {useState, useRef, useContext, useEffect} from 'react';
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import classes from "../Auth/AuthForm.module.css";

const RecordsTable = () => {
    const [records, setRecords] = useState([]);
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState([]);
    const [sort, setSort] = useState([]);

    const [value, setValue] = React.useState(1);
    const [lectors, setLectors] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    const [filterByLector, setFilterByLector] = useState('');
    const [filterByGroup, setFilterByGroup] = useState('');
    const [filterByDiscipline, setFilterByDiscipline] = useState('');


    const getLectors = async () => {
        const data = await fetch("/lectors/all");
        const dataJson = await data.json();
        console.log("all lect")
        console.log(dataJson)
        setLectors(dataJson);
    }

    const getDisciplines = async () => {
        const data = await fetch("/disciplines");
        const dataJson = await data.json();
        setDisciplines(dataJson);

    }


    const fetchData = async () => {
   await getLectors();
    await getDisciplines();

        console.log("here")
        let dataJson;
        if(filterByLector !== ''){
            const data = await fetch("/records/lecturer/"+filterByLector);
            dataJson = await data.json();
            // setFilterByLector('');
        }else if(filterByGroup !== ''){
            console.log("by gro");
            console.log(filterByGroup);
            const data = await fetch("/records/group/"+filterByGroup);
            dataJson = await data.json();
            // setFilterByGroup('');
        }else if(filterByDiscipline !== ''){
            console.log("by discipline");
            console.log(filterByDiscipline);
            const data = await fetch("/records/discipline/"+filterByDiscipline);
            dataJson = await data.json();
            console.log("datajson")
            console.log(dataJson)
            // setFilterByDiscipline('');
        }else{
            const data = await fetch("/records/all/full");
            dataJson = await data.json();
        }



        setRecords(dataJson);
        setFilterByLector('')
    }

    useEffect(  () => {
        fetchData();
    }, [filterByLector,filterByDiscipline])


    return (
<>
        <div>
            <div>
                <h2>Привіт, тут ти можеш обрати критерій фільтрації, щоб переглянути потрібні тобі записи!</h2>
                <Paper square>
                    <Tabs
                        value={value}
                        textColor="primary"
                        indicatorColor="primary"
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <Tab label="Лектор" />

                        <Tab label="Дисципліна" />
                    </Tabs>


                    {value === 0 && <p style={{paddingBottom: '30px', paddingTop: '30px'}}>
                    <label htmlFor="ice-cream-choice" style={{marginRight: '20px'}}>Оберіть лектора для фільтрації</label>
                        <input list="ice-cream-flavors" id="ice-cream-choice"  onChange={e => setFilterByLector(e.target.value)} name="ice-cream-choice" />

                        <datalist id="ice-cream-flavors">
                            {(lectors || []).map(lector => (
                            <option key={lector.lecturerId} value={lector.lecturerId}>{lector.surname + ' '+ lector.name + ' '+ lector.middlename}</option>
                                ))}
                        </datalist>
                        </p>}


                    {value === 1 && <p style={{paddingBottom: '30px', paddingTop: '30px'}}>
                        <label  style={{marginRight: '20px'}}>Оберіть дисципліну для фільтрації</label>
                        <input list="disc-lists"  onChange={e => setFilterByDiscipline(e.target.value)} />

                        <datalist id="disc-lists">
                            {(disciplines || []).map(discipline => (
                                <option key={discipline.disciplineId} value={discipline.disciplineId}>{discipline.name}</option>
                            ))}
                        </datalist>
                    </p>}

                </Paper>
            </div>
        </div>
    <section>
        <table className={classes.disciplineTable}>
            <thead>
            <tr>
                <th>#</th>
                <th>Дисципліна</th>
                <th>Час</th>
                <th>№ групи</th>
                <th>№ аудиторії</th>
                <th>ПІБ лектора</th>
            </tr>
            </thead>
            <tbody>
            {(records || []).map(record => (
                <tr>
                    <td>{record.id}</td>
                    <td>{record.disciplineName}</td>
                    <td>{record.groupNumber}</td>
                    <td>{record.weekNumber + " тиждень, "+record.weekDay + '. Час: ' + record.classTime}</td>
                    <td>{record.classroomName}</td>
                    <td>{record.lecturerSurname + ' '+ record.lecturerName + ' '+ record.lecturerMiddlename}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </section>
    </>

    )
};


export default RecordsTable;