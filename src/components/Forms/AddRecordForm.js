import { useState, useEffect } from 'react';

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

    const fetchData = async () => {
        setDisciplines(await getAllDisciplines());
        setGroups(await getAllGroups());
        setClassrooms(await getAllClassrooms());
        setClasstimes(await getAllClassTimes());
        setLectors(await getAllLectors());
    };

    useEffect(() => {
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
        response.ok ?  alert("Запис успішно додано.") :  alert("Запис не було додано. Status: "+ response.status);
        setDisciplineSelected(1);
        setLectorSelected(1);
        setGroupSelected(1);
        setClassroomSelected(1);
        setClasstimeSelected(1);
        setIsLoading(false);
    };

    return (
        <section className={classes.auth}>
            <h1>Запис в розкладі</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='disciplineId'>Дисципліна</label>
                    <select name="disciplineId" id="disciplineId"
                            onChange={e => setDisciplineSelected(e.target.value)}>
                        {(disciplines || []).map(i => (
                            <option value={i.disciplineId} key={i.disciplineId}>
                                {i.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='classTimeId'>Час</label>
                    <select name="classTimeId" id="classTimeId"
                            onChange={e => setClasstimeSelected(e.target.value)}>
                        {(classtimes || []).map(i => (
                            <option value={i.classTimeId} key={i.classTimeId}>
                                {i.classTime + ', ' + i.weekDay + ', тиждень:' + i.weekNumber}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='groupId'>Група</label>
                    <select name="groupId" id="groupId"
                            onChange={e => setGroupSelected(e.target.value)}>
                        {(groups || []).map(i => (
                            <option value={i.id} key={i.id}>
                                {'#' + i.groupNumber + ', ' + i.specialization + '-' + i.course +', '+ (i.isLecture ? 'лекція' : 'практика')}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='classroomId'>Кабінет</label>
                    <select name="classroomId" id="classroomId"
                            onChange={e => setClassroomSelected(e.target.value)}>
                        {(classrooms || []).map(i => (
                            <option value={i.classroomId} key={i.classroomId}>
                                {i.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='lecturerId'>Лектор</label>
                    <select name="lecturerId" id="lecturerId"
                            onChange={e => setLectorSelected(e.target.value)}>
                        {(lectors || []).map(i => (
                            <option value={i.lecturerId} key={i.lecturerId}>
                                {i.surname + ' ' + i.name + ' '+ i.middlename}
                            </option>
                        ))}
                    </select>
                </div>
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