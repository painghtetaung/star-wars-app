import axios from "axios";

export const getSpec = async (route: string) => {
    const response = await axios.get(`${route}`);
    return response.data;
};
