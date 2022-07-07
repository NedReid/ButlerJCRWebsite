import axios from "axios";

export const getEvents = async () => {
    const response = await axios.get("/api/students/getEvents");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const createEventBooking = async (event) => {
    const response = await axios.post("/api/students/createEventBooking", event);
    if (response.status === 200) {
        return response.data;
    }
}