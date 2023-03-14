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

export const createPost =  async (event) => {
    const response = await axios.post("/api/students/createPost", event);
    if (response.status === 201)
    {
        return response.data;
    }
}

export const updatePost =  async (event) => {
    const response = await axios.post("/api/students/updatePost", event);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const deletePost =  async (event) => {
    const response = await axios.post("/api/students/deletePost", event);
    if (response.status === 200) {
        return response.data;
    }
}

export const getUserPosts =  async () => {
    const response = await axios.get("/api/students/getUserPosts");
    if (response.status === 200) {
        return response.data;
    }
}

export const getPost =  async (_id) => {
    const response = await axios.get("/api/students/getPost", {params: {_id: _id}});
    if (response.status === 200) {
        return response.data;
    }
}


export const getPostCategories = async () => {
    const response = await axios.get("/api/students/getPostCategories");
    if (response.status === 200) {
        return response.data;
    }
}