"use client"

import Image from 'next/image'
import {Button, Input} from "antd";
import {LeftOutlined, RightOutlined, SearchOutlined} from "@ant-design/icons";
import useFetchPeople from "@/hooks/useFetchPeople"
import {useRouter, useSearchParams} from "next/navigation";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton";
import React, {useEffect, useState} from "react";
import {peopleListsType} from "@/types";

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [peopleLists, setPeopleLists] = useState([]);

   const getNextPage = (urlString: string | null | undefined) => {
       if (urlString) {
           const urlParts = urlString.split("?");
           if (urlParts.length > 1) {
               const queryString = urlParts[1];

               // Split the query string by the "&" character to separate individual parameters
               const parameters = queryString.split("&");

               // Initialize a variable to store the "page" value
               let pageValue = null;

               // Loop through the parameters to find the "page" parameter
               for (const param of parameters) {
                   const [key, value] = param.split("=");
                   if (key === "page") {
                       pageValue = value;
                       break; // Stop the loop once "page" is found
                   }
               }

               if (pageValue !== null) {
                   return parseInt(pageValue);
               }
           }
       }
   }


    const {
        mutate: fetchPeople,
        isLoading: peopleLoading,
        error: peopleError,
        data: peopleResponse
    } = useFetchPeople();

    const searchOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        // router.push(`${/}`)
        fetchPeople(`https://swapi.dev/api/people/?search=${e.currentTarget.value}`)
        // console.log(e.target.value);
    }

    const paginationHandler = (route: string) => {
        fetchPeople(route)
    }

    useEffect(() => {
        fetchPeople("https://swapi.dev/api/people/")
    }, [fetchPeople])



    useEffect(() => {
        if(!peopleLoading && peopleResponse) {
            let peopleListRes = peopleResponse.results;
            setPeopleLists(peopleListRes)
        }
    }, [peopleLoading, peopleResponse])

    console.log(getNextPage(peopleResponse?.next))
    return (
    <main className="flex min-h-screen flex-col">
        <nav className="p-8 grid grid-cols-3">
            <div/>
            <div className="grid justify-items-center">
                <Image src="/star-wars-logo.png" alt="star-wars-logo" width={184} height={80}/>
            </div>
            <div className="flex justify-end">
                <div className="flex items-center gap-4">
                    <div className="text-lg flex gap-x-2 items-center"><SearchOutlined /><Input onChange={searchOnChange} className="!placeholder-white !w-[80px]" placeholder="Search" bordered={false} /></div>
                    <Button className="!text-white" type="text">Sign In</Button>
                </div>
            </div>
        </nav>
        {
            peopleLoading ? <LoadingSkeleton/> : (
                <section className="px-8 grid grid-cols-8 gap-x-8 gap-y-6">
                    {
                        peopleLists.length > 0 ? (

                                peopleLists.map((list: peopleListsType, index) => (
                                    <div className="group cursor-pointer" key={index}>
                                        <Image className="rounded-lg" src={`https://picsum.photos/200?random=${index}`} alt="profile-url" width={200} height={150}/>
                                        <div className=" flex gap-x-2 mt-4">
                                            <div className="w-[24px] h-[4px] bg-[#5a5c5d] group-hover:bg-white rounded"/>
                                            <div className="w-1 h-1 bg-[#5a5c5d] rounded-full group-hover:bg-white"/>
                                        </div>
                                        <h3 className="mt-2">{list.name}</h3>
                                    </div>
                                ))

                        ) : <>NO Lists</>
                    }
                </section>

            )
        }
        {
            !peopleLoading && peopleResponse?.count > 10 && (
                <div className="flex items-center justify-center mt-10">
                    <div className="flex items-center gap-x-2">
                        <Button type="primary" className="!text-white" shape="circle" icon={<LeftOutlined />} disabled={!peopleResponse?.previous} onClick={() => paginationHandler(peopleResponse?.previous)}/>
                        {peopleResponse?.next !== null ? parseInt(getNextPage(peopleResponse?.next) as unknown as string) - 1 : "last page"}
                        <Button type="primary" className="!text-white" shape="circle" icon={<RightOutlined />} disabled={!peopleResponse?.next} onClick={() => paginationHandler(peopleResponse?.next)}/>

                    </div>
                </div>
            )
        }
    </main>
  )
}
