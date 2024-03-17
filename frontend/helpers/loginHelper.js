import axios from "axios";

export const login = async (username, password) => {
    const response = await axios.post("/api/login", { username: username, password: password });
    return response;
};

export const register = async (username, password) => {
    const response = await axios.post("/api/register", { username: username, password: password });
    return response;
};

export const resendVerificationEmail = async () => {
    const response = await axios.get("/api/resendVerificationEmail");
    if (response.status === 201) {
        return true;
    } else {
        return false;
    }
};

export const passwordResetEmail = async (username) => {
    const response = await axios.post("/api/passwordResetEmail", { username: username });
    if (response.status === 200) {
        return response;
    }
};

export const isLoggedIn = async () => {
    const response = await axios.get("/api/isLoggedIn");
    console.log(response);
    if (response.status === 201) {
        console.log("a");
        return response.data;
    }
    return { username: false, verified: false, admin: false };
};

export const getUserByResetToken = async (resetToken) => {
    const response = await axios.get("/api/getUserByResetToken", {
        params: { resetToken: resetToken },
    });
    console.log(response);
    if (response.status === 201 && response.data.username !== false) {
        return response.data;
    } else {
        return undefined;
    }
};

export const submitNewPassword = async (token, password) => {
    const response = await axios.post("/api/submitNewPassword", {
        token: token,
        password: password,
    });
    return response;
};

export const verifyLogin = async (token) => {
    const response = await axios.post("/api/verifyLogin", { token: token });
    return response;
};

export const logout = async () => {
    const response = await axios.get("/api/logout");
    if (response.status === 201) {
        window.location.reload(false);
        return response.data;
    }
};
