import axios from "axios";

export const getEvents =  async () => {
    const response = await axios.get("/api/admin/getEvents");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const createEvent =  async (event) => {
    const response = await axios.post("/api/admin/createEvent", event);
    if (response.status === 201)
    {
        return response.data;
    }
}

export const updateEvent =  async (event) => {
    const response = await axios.post("/api/admin/updateEvents", event);
    if (response.status === 200)
    {
        return response.data;
    }
}