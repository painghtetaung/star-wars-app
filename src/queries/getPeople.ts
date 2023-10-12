import axios from "axios";
const API_URL = "https://swapi.dev/api/"

export const fetchPeople = async (route: string) => {
    const response = await axios.get(`${route}`);
    return response.data;
};
