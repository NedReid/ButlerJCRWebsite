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

export const getRoleHeaders =  async () => {
    const response = await axios.get("/api/admin/getRoleHeaders");
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

export const getOfficers =  async () => {
    const response = await axios.get("/api/admin/getOfficers");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const createOfficer =  async (event) => {
    const response = await axios.post("/api/admin/createOfficer", event);
    if (response.status === 201)
    {
        return response.data;
    }
}

export const updateOfficer =  async (event) => {
    const response = await axios.post("/api/admin/updateOfficer", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const deleteOfficer =  async (event) => {
    const response = await axios.post("/api/admin/deleteOfficer", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getMeetings =  async () => {
    const response = await axios.get("/api/admin/getMeetings");
    if (response.status === 200)
    {
        response.data.forEach(meeting => meeting.date = new Date(meeting.date))
        return response.data;
    }
}

export const getMeetingHeaders =  async () => {
    const response = await axios.get("/api/admin/getMeetingHeaders");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const createMeeting =  async (event) => {
    const response = await axios.post("/api/admin/createMeeting", event);
    if (response.status === 201)
    {
        return response.data;
    }
}

export const updateMeeting =  async (event) => {
    const response = await axios.post("/api/admin/updateMeeting", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const deleteMeeting =  async (event) => {
    const response = await axios.post("/api/admin/deleteMeeting", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getMotions =  async () => {
    const response = await axios.get("/api/admin/getMotions");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const createMotion =  async (event) => {
    const response = await axios.post("/api/admin/createMotion", event);
    if (response.status === 201)
    {
        return response.data;
    }
}

export const updateMotion =  async (event) => {
    const response = await axios.post("/api/admin/updateMotion", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const deleteMotion =  async (event) => {
    const response = await axios.post("/api/admin/deleteMotion", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getCandidates =  async () => {
    const response = await axios.get("/api/admin/getCandidates");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const createCandidate =  async (event) => {
    const response = await axios.post("/api/admin/createCandidate", event);
    if (response.status === 201)
    {
        return response.data;
    }
}

export const updateCandidate =  async (event) => {
    const response = await axios.post("/api/admin/updateCandidate", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const deleteCandidate =  async (event) => {
    const response = await axios.post("/api/admin/deleteCandidate", event);
    if (response.status === 200)
    {
        return response.data;
    }
}
