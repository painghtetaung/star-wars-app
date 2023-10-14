import StarWarsClient from "@/app/pageClient";
import {Metadata} from "next";


 const Home = async () => {
    return (
     <StarWarsClient/>
  )
}

export const metadata: Metadata = {
    title: "Home | May the Force Be With You.",
    description: "May the Force Be With You.",
};

export default Home;