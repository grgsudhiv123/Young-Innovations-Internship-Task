import { BASE_URL } from "./constants.js"


export const FetchApi = async (url, filter) => {
    try {
        const response = await fetch(`${BASE_URL}/${url}?${filter}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}