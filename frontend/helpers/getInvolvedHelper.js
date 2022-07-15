import axios from "axios";

export const getSSCHeaders = async () => {
    const response = await axios.get("/api/get-involved/getSSCHeaders");
    if (response.status === 200)
    {
        return response.data;
    }
}

