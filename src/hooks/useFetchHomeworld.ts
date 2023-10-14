

import { useMutation } from "@tanstack/react-query";
import {getSpec} from "@/queries/getSpec";
const useFetchHomeworld = () => {
    return useMutation({
        mutationFn: async (route: string) =>
            getSpec(route),
    });
};

export default useFetchHomeworld;

