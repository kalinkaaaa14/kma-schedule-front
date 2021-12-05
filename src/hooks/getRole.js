const getRoles = () => {
    fetch("http://localhost:8000/authority", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(async (res) => {
            let dataReceived = await res.clone().json();
            console.log(dataReceived);
            if (res.ok) {
                return dataReceived;
            } else {
                return res.json().then(() => {
                    let errorMessage = 'Something went wrong!';
                    throw new Error(errorMessage);
                });
            }
        })
        .then((data) => {
            return data.roles.map(role => role.name);
        })
        .catch((err) => {
            alert(err.message);
        });
};

export const isAdmin = () => {
    let roles = getRoles();
    console.log(roles);
    // return roles.includes("ADMIN");
    return true;
};

export const isRegisteredUser = () => {
    let roles = getRoles();
    // return roles.includes("USER");
    return true;
};

export default {isAdmin, isRegisteredUser};