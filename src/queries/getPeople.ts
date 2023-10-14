import axios from "axios";

export const fetchPeople = async (route: string) => {
    const response = await axios.get(`${route}`);
    return response.data;
};
