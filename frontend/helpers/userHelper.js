import axios from "axios";

export const updateDisplayName = async (event) => {
    const response = await axios.post("/api/students/updateDisplayName", event);
    if (response.status === 200) {
        return response.data;
    }
};

export const getUser = async (event) => {
    const response = await axios.get("/api/students/getUser", event);
    if (response.status === 200) {
        return response.data;
    }
};
