import axios from "axios";
import download from "js-file-download";

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
        response.data.forEach(meeting => meeting.date = new Date(meeting.date))
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

export const getPostCategories =  async () => {
    const response = await axios.get("/api/admin/getPostCategories");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const createPostCategory =  async (event) => {
    const response = await axios.post("/api/admin/createPostCategory", event);
    if (response.status === 201)
    {
        return response.data;
    }
}

export const updatePostCategory =  async (event) => {
    const response = await axios.post("/api/admin/updatePostCategory", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const deletePostCategory =  async (event) => {
    const response = await axios.post("/api/admin/deletePostCategory", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getProducts =  async () => {
    const response = await axios.get("/api/admin/getProducts");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const createProduct =  async (event) => {
    const response = await axios.post("/api/admin/createProduct", event);
    if (response.status === 201)
    {
        return response.data;
    }
}

export const updateProduct =  async (event) => {
    const response = await axios.post("/api/admin/updateProduct", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const deleteProduct =  async (event) => {
    const response = await axios.post("/api/admin/deleteProduct", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getMembersExcel =  async () => {
    const response = await axios.get("/api/admin/getMembersExcel", {responseType:"blob"});
    download(response.data, "members.xlsx")
    // if (response.status === 200)
    // {
    //     return response.data;
    // }
    console.log(await response)
}
export const getMembers =  async () => {
    const response = await axios.get("/api/admin/getMembers");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const addMemberList =  async (memberList) => {
    const response = await axios.post("/api/admin/addMemberList", memberList);
    if (response.status === 200)
    {
        return response.data;
    }
}
export const updateMember =  async (member) => {
    const response = await axios.post("/api/admin/updateMember", member);
    if (response.status === 200)
    {
        return response.data;
    }

}

export const deleteMember =  async (member) => {
    const response = await axios.post("/api/admin/deleteMember", member);
    if (response.status === 200)
    {
        return true;
    }
}

export const uploadAlbumPhoto =  async (member) => {
    const response = await axios.post("/api/admin/uploadAlbumPhoto", member);
    if (response.status === 200)
    {
        return true;
    }
}

export const getCalendarEvents =  async () => {
    const response = await axios.get("/api/admin/getCalendarEvents");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const createCalendarEvent =  async (event) => {
    const response = await axios.post("/api/admin/createCalendarEvent", event);
    if (response.status === 201)
    {
        return response.data;
    }
}

export const updateCalendarEvent =  async (event) => {
    const response = await axios.post("/api/admin/updateCalendarEvent", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getKeyValue =  async (key) => {
    const response = await axios.get("/api/admin/getKeyValue", {params: {key: key}});
    if (response.status === 200)
    {
        return response.data;
    }
}

export const setKeyValue =  async (key, value) => {
    const response = await axios.post("/api/admin/setKeyValue", {key: key, value: value});
    if (response.status === 201)
    {
        return response.data;
    }
}

export const createFAQ =  async (q) => {
    const response = await axios.post("/api/admin/createFAQ", {question: q.question, answer: q.answer, order: q.order, category: q.category});
    if (response.status === 201)
    {
        return response.data;
    }
}

export const updateFAQ =  async (q) => {
    const response = await axios.post("/api/admin/updateFAQ", q);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const deleteFAQ =  async (q) => {
    const response = await axios.post("/api/admin/deleteFAQ", q);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getDocuments =  async () => {
    const response = await axios.get("/api/admin/getDocuments");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const createDocument =  async (document, file) => {
    const response = await axios.post("/api/admin/createDocument", {document: document, file: file});
    if (response.status === 201)
    {
        return response.data;
    }
}

export const updateDocument =  async (document, file) => {
    const response = await axios.post("/api/admin/updateDocument", {document: document, file: file});
    if (response.status === 200)
    {
        return response.data;
    }
}

export const deleteDocument =  async (document) => {
    const response = await axios.post("/api/admin/deleteDocument", {document: document});
    if (response.status === 200)
    {
        return response.data;
    }
}

export const createWhosWho =  async (data) => {
    const response = await axios.post("/api/admin/createWhosWho", data);
    if (response.status === 201)
    {
        return response.data;
    }
}

export const updateWhosWho =  async (data) => {
    const response = await axios.post("/api/admin/updateWhosWho", data);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const deleteWhosWho =  async (data) => {
    const response = await axios.post("/api/admin/deleteWhosWho", data);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getPhotoAlbums =  async () => {
    const response = await axios.get("/api/admin/getPhotoAlbums");
    if (response.status === 200)
    {
        return response.data;
    }
}

export const updatePhotoAlbum =  async (data) => {
    const response = await axios.post("/api/admin/updatePhotoAlbum", data);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const deletePhotoAlbum =  async (data) => {
    const response = await axios.post("/api/admin/deletePhotoAlbum", data);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const  createPhotoAlbum =  async (data) => {
    const response = await axios.post("/api/admin/createPhotoAlbum", data);
    if (response.status === 200)
    {
        return response.data;
    }
}
