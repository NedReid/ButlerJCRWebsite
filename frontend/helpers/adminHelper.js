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
    const response = await axios.post("/api/admin/updateEvent", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getSSCs =  async () => {
    const response = await axios.get("/api/admin/getSSCs");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const createSSC =  async (event) => {
    const response = await axios.post("/api/admin/createSSC", event);
    if (response.status === 201)
    {
        return response.data;
    }
}

export const updateSSC =  async (event) => {
    const response = await axios.post("/api/admin/updateSSC", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const deleteSSC =  async (event) => {
    const response = await axios.post("/api/admin/deleteSSC", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getPagePerms =  async () => {
    const response = await axios.get("/api/admin/getPagePerms");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const createPagePerms =  async (pagePerms) => {
    const response = await axios.post("/api/admin/createPagePerms", pagePerms);
    if (response.status === 201)
    {
        return response.data;
    }
}

export const updatePagePerms =  async (pagePerms) => {
    const response = await axios.post("/api/admin/updatePagePerms", pagePerms);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const deleteAdminPerms =  async (event) => {
    const response = await axios.post("/api/admin/deleteAdminPerms", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const createAdminPerms =  async (adminPerms) => {
    const response = await axios.post("/api/admin/createAdminPerms", adminPerms);
    if (response.status === 201)
    {
        return response.data;
    }
}

export const updateAdminPerms =  async (adminPerms) => {
    const response = await axios.post("/api/admin/updateAdminPerms", adminPerms);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getAdminPerms =  async () => {
    const response = await axios.get("/api/admin/getAdminPerms");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getRoles =  async () => {
    const response = await axios.get("/api/admin/getRoles");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const createRole =  async (event) => {
    const response = await axios.post("/api/admin/createRole", event);
    if (response.status === 201)
    {
        return response.data;
    }
}

export const updateRole =  async (event) => {
    const response = await axios.post("/api/admin/updateRole", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const deleteRole =  async (event) => {
    const response = await axios.post("/api/admin/deleteRole", event);
    if (response.status === 200)
    {
        return response.data;
    }
}