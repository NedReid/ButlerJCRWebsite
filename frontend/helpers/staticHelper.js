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
