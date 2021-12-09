import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import classes from '../Auth/AuthForm.module.css';
import {getAllClassrooms, getAllClassTimes, getAllDisciplines, getAllGroups, getAllLectors} from "../../hooks/getData";

const AddRecordForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [disciplines, setDisciplines] = useState([]);
    const [disciplineId, setDisciplineSelected] = useState(1);
    const [lectors, setLectors] = useState([]);
    const [lecturerId, setLectorSelected] = useState(1);
    const [groups, setGroups] = useState([]);
    const [groupId, setGroupSelected] = useState(1);
    const [classtimes, setClasstimes] = useState([]);
    const [classTimeId, setClasstimeSelected] = useState(1);
    const [classrooms, setClassrooms] = useState([]);
    const [classroomId, setClassroomSelected] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setDisciplines(await getAllDisciplines());
            setGroups(await getAllGroups());
            setClassrooms(await getAllClassrooms());
            setClasstimes(await getAllClassTimes());
            setLectors(await getAllLectors());
        };
        fetchData();
        // console.log(lectors)
        // console.log(disciplines)
    }, []);

    const submitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        console.log(disciplineId, "HEERE")
        const response = await fetch("/records", {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                disciplineId,
                classTimeId,
                groupId,
                classroomId,
                lecturerId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response);
        response.ok ?  alert("Record is added successfully.") :  alert("Adding record FAILED. Status: "+ response.status);
    };

    return (
        <section className={classes.auth}>
            <h1>Запис в розкладі</h1>
            <form onSubmit={submitHandler}>
                <select className={classes.control} name="disciplineId" id="disciplineId"
                        onChange={e => setDisciplineSelected(e.target.value)}>
                    {(disciplines || []).map(i => (
                        <option value={i.disciplineId} key={i.disciplineId}>
                            {i.name}
                        </option>
                    ))}
                </select>
                <select className={classes.control} name="classTimeId" id="classTimeId" onChange={e => setClasstimeSelected(e.target.value)}>
                    {(classtimes || []).map(i => (
                        <option value={i.classTimeId} key={i.classTimeId}>
                            {i.classTime}
                        </option>
                    ))}
                </select>
                <select className={classes.control} name="groupId" id="groupId" onChange={e => setGroupSelected(e.target.value)}>
                    {(groups || []).map(i => (
                        <option value={i.groupId} key={i.groupId}>
                            {i.groupNumber}
                        </option>
                    ))}
                </select>
                <select className={classes.control} name="classroomId" id="classroomId" onChange={e => setClassroomSelected(e.target.value)}>
                    {(classrooms || []).map(i => (
                        <option value={i.classroomId} key={i.classroomId}>
                            {i.name}
                        </option>
                    ))}
                </select>
                <select className={classes.control} name="lecturerId" id="lecturerId" onChange={e => setLectorSelected(e.target.value)}>
                    {(lectors || []).map(i => (
                        <option value={i.lecturerId} key={i.lecturerId}>
                            {i.name}
                        </option>
                    ))}
                </select>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>Створити запис</button>
                    )}
                    {isLoading && <p>Відправляємо дані...</p>}
                </div>
            </form>
        </section>
    );
};

export default AddRecordForm;