import axios from "axios";

export const getEvents =  async () => {
    const response = await axios.get("/api/student/getEvents");
    if (response.status === 200)
    {
        return response.data;
    }
}
