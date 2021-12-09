export const getAllDisciplines = async () => {
    const data = await fetch(`/disciplines`);
    console.log(data);
    return await data.json();
};

export const getAllLectors = async () => {
    const data = await fetch(`/lectors/all`);
    return await data.json();
};

export const getAllClassTimes = async () => {
    const data = await fetch(`/classtime/all`);
    return await data.json();
};

export const getAllGroups = async () => {
    const data = await fetch(`/group/all`);
    return await data.json();
};

export const getAllClassrooms = async () => {
    const data = await fetch(`/classroom/all`);
    return await data.json();
};