const getRole = async () => {
    const data = await fetch("/authority");
    const dataJson = await data.json();
    const roles = dataJson.map(role => role.name);
}

export default {getRole};