import axios from "axios";

export const getSSCHeaders = async () => {
    const response = await axios.get("/api/get-involved/getSSCHeaders");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getSSC = async (_id) => {
    console.log(_id)
    const response = await axios.get("/api/get-involved/getSSC", {params: {_id: _id}});
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getSSCBySlug = async (slug) => {
    console.log(slug)
    const response = await axios.get("/api/get-involved/getSSCBySlug", {params: {slug: slug}});
    if (response.status === 200)
    {
        return response.data;
    }
}

export const updateSSC =  async (SSC) => {
    const response = await axios.post("/api/get-involved/updateSSC", SSC);
    if (response.status === 200)
    {
        return response.data;
    }
}