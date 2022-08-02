const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api';
// 'https://fitnesstrac-kr.herokuapp.com/api'
// 'https://desolate-atoll-43736.herokuapp.com/api';

// fetch all activities
export const fetchAllActivities = async () => {
    const url = `${BASE_URL}/activities`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// fetch all public routines
export const fetchAllPublicRoutines = async () => {
    const url = `${BASE_URL}/routines`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// register
export const createAccount = async (username, password) => {
    const url = `${BASE_URL}/users/register`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// login
export const userLogin = async (username, password) => {
    const url = `${BASE_URL}/users/login`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// create activity
export const createActivity = async (name, description, token) => {
    const url = `${BASE_URL}/activities`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                description
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// create routine
export const createRoutine = async (name, goal, isPublic, token) => {
    const url = `${BASE_URL}/routines`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                goal,
                isPublic
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// fetch all my routines
export const fetchAllMyRoutines = async (token, username) => {
    const url = `${BASE_URL}/users/${username}/routines`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// delete my routine
export const deleteRoutine = async (routineId, token) => {
    const url = `${BASE_URL}/routines/${routineId}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// edit my routine
export const editRoutine = async (name, goal, isPublic, routineId, token) => {
    const url = `${BASE_URL}/routines/${routineId}`;

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                goal,
                isPublic
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// add activity to routine
export const AddActivityToRoutine = async (routineId, activityId, count, duration, token) => {
    const url = `${BASE_URL}/routines/${routineId}/activities`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                activityId,
                count,
                duration
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}