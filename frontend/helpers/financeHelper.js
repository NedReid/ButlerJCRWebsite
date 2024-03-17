import axios from "axios";

export const payLevy = async () => {
    const response = await axios.post("/api/payments/payLevy", {});
    return response.data;
};
