export const postData = async (path, data) => {
    const res = await fetch(`http://localhost:8080/${path}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return res;
}

export const updateData = async (path, data) => {
    const res = await fetch(`http://localhost:8080/${path}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return res;
}

export const deleteData = async (path) => {
    const res = await fetch(`http://localhost:8080/${path}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json',
        }
    })
    return res;
}

export const getData = async (path) => {
    const res = await fetch(`http://localhost:8080/${path}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json',
        }
    })
    return res;
}

export const paramsURL = (params) => {
    let newParamsURL = "/";
    params.forEach((e) => newParamsURL = newParamsURL + e + "/");
    return newParamsURL;
}