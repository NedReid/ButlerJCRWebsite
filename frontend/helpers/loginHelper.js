import axios from "axios";

export const login =  async (username, password) => {
    const response = await axios.post("/api/login", {username: username, password: password});
    return response;
}

export const register =  async (username, password) => {
    const response = await axios.post("/api/register", {username: username, password: password});
    return response;
}

export const resendVerificationEmail =  async () => {
    const response = await axios.get("/api/resendVerificationEmail");
    if (response.status === 201)
    {
        return true;
    }
    else {
        return false;
    }
}

export const isLoggedIn =  async () => {
    const response = await axios.get("/api/isLoggedIn");
    console.log(response);
    if (response.status === 201)
    {
        console.log("a");
        return response.data;
    }
    return {username: false, verified: false, admin:false}
}

export const logout = async () => {
    const response = await axios.get("/api/logout");
    if (response.status === 201)
    {
        window.location.reload(false);
        return response.data;
    }
}