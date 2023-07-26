import axios from "axios";


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {

        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

export const getFolderAddresses = async (folder) => {
    const response = await axios.get("/api/static/getFolderAddresses", {params: {folder:folder}});
    if (response.status === 200)
    {
        return shuffleArray(response.data);
    }
}

export const getPageEditables = async (page) => {
    const response = await axios.get("/api/static/getPageEditables", {params: {page: page}});
    if (response.status === 200)
    {
        return response.data;
    }
}

export const updatePageEditables = async (page, editables) => {
    const response = await axios.post("/api/static/updatePageEditables", {page: page, editables: editables});
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getAlbums = async () => {
    const response = await axios.get("/api/static/getAlbums");
    if (response.status === 200)
    {
        return response.data;
    }
}
export const getAlbumFiles = async (album) => {
    const response = await axios.get("/api/static/getAlbumFiles", {params: {album: album}});
    if (response.status === 200)
    {
        return response.data;
    }
}


export const getPost = async (_id) => {
    console.log(_id)
    const response = await axios.get("/api/getPost", {params: {_id: _id}});
    if (response.status === 200)
    {
        return response.data;
    }
}
export const getPostsOfType = async (_id) => {
    console.log(_id)
    const response = await axios.get("/api/getPostsOfType", {params: {_id: _id}});
    if (response.status === 200)
    {
        return response.data;
    }

}
export const getPostsOfTypes = async (types, number) => {
    console.log(types)
    const response = await axios.get("/api/getPostsOfTypes", {params: {types: types, number: number}});
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getCalendarEventPreviews = async () => {
    const response = await axios.get("/api/getCalendarEventPreviews");
    if (response.status === 200) {
        return response.data;
    }
}

export const getCalendarEventSelection = async (selection) => {
    const response = await axios.get("/api/getCalendarEventSelection", {params: {selection: selection}});
    if (response.status === 200) {
        return response.data;
    }
}

export const sendFeedback = async (feedback) => {
    const response = await axios.post("/api/static/sendFeedback", feedback);
    if (response.status === 200)
    {
        return response.data;
    }
}

export const getFAQofCategory = async (category) => {
    const response = await axios.get("/api/getFAQofCategory", {params: {category: category}});
    if (response.status === 200) {
        return response.data;
    }
}
