import {fetchPeople} from "@/queries/getPeople";


import { useMutation } from "@tanstack/react-query";
const useFetchPeople = () => {
    return useMutation({
        mutationFn: async (route: string) =>
            fetchPeople(route),
    });
};

export default useFetchPeople;

