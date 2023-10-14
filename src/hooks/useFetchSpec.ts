

import { useMutation } from "@tanstack/react-query";
import {getSpec} from "@/queries/getSpec";
const useFetchSpec = () => {
    return useMutation({
        mutationFn: async (route: string) =>
            getSpec(route),
    });
};

export default useFetchSpec;

