import axios from "axios";

export const getRoleHeaders = async () => {
    const response = await axios.get("/api/democracy/getRoleHeaders");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getRole = async (_id) => {
    console.log(_id)
    const response = await axios.get("/api/democracy/getRole", {params: {_id: _id}});
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getRoleBySlug = async (slug) => {
    console.log(slug)
    const response = await axios.get("/api/democracy/getRoleBySlug", {params: {slug: slug}});
    if (response.status === 200)
    {
        console.log(response)
        return response.data;
    }
}

export const updateRole =  async (role) => {
    if (role.slug === undefined || role.slug === "") {
        role.slug = role._id;
    }
    const response = await axios.post("/api/democracy/updateRole", role);
    if (response.status === 200)
    {
        return response.data;
    }
}

