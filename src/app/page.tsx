"use client"

import Image from 'next/image'
import {Button, Input, Modal, Select} from "antd";
import {LeftOutlined, RightOutlined, SearchOutlined, FilterFilled} from "@ant-design/icons";
import useFetchPeople from "@/hooks/useFetchPeople";
import {useRouter, useSearchParams} from "next/navigation";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton";
import React, {useEffect, useState} from "react";
import {peopleListsType} from "@/types";

type filterObjType = {
    homeWorld: string | number,
    species: string | number,
    films: string | number
}


export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [peopleLists, setPeopleLists] = useState([]);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [searchByHomeWorld, setSearchByHomeWorld]=useState<null | number>(null);
    const [searchByFilms, setSearchByFilms]=useState<null | number>(null);
    const [searchBySpecies, setSearchBySpecies]=useState<null | number>(null);
    const[handleOkState,setHandleOkState] = useState(false);
    const [filterObject, setFilterObject] = useState<filterObjType>({
        homeWorld: "",
        species: "",
        films: ""
    });
    const filterPeople = (peopleListRes: []) => {
        return peopleListRes?.length > 0 && peopleListRes.filter((list: any) => {
            const homeworldFilter = filterObject.homeWorld === "" || list.homeworld === filterObject.homeWorld;
            const speciesFilter = filterObject.species === "" || list.species === filterObject.species;
            const filmsFilter = filterObject.films === "" || list.films === filterObject.films;
            return homeworldFilter && speciesFilter && filmsFilter
        })
     }
    const showModal = () => {
        setIsFilterModalOpen(true);
    };

    const handleOk = () => {
        setIsFilterModalOpen(false);
        setHandleOkState(true);
        const filterRes = filterPeople();
        setPeopleLists(filterRes);
    };

    const handleCancel = () => {
        setIsFilterModalOpen(false);
        setHandleOkState(false);
        fetchPeople("https://swapi.dev/api/people/")
        setSearchByFilms(null);
        setSearchBySpecies(null);
        setSearchByHomeWorld(null);
        setFilterObject({
            homeWorld: "",
            species: "",
            films: ""
        })
    };

   const homeWorldFilterHandler = (value: number) => {
       setFilterObject({
           homeWorld: value ? value : "",
           species: "",
           films: ""
       })
       setSearchByHomeWorld(value);
       setSearchByFilms(null);
       setSearchBySpecies(null);
   }

   const speciesFilterHandler = (value: number) => {
       setFilterObject({
           homeWorld: "",
           species: value ? value : "",
           films: ""
       })
       setSearchBySpecies(value)
       setSearchByHomeWorld(null);
       setSearchByFilms(null);
    }

    const filmsFilterHandler = (value: number) => {
        setFilterObject({
            homeWorld: "",
            species: "",
            films: value ? value : "",
        })
        setSearchByFilms(value);
        setSearchByHomeWorld(null);
        setSearchBySpecies(null);
    }

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
            console.log("use effect calling")
            let peopleListRes = peopleResponse.results;
            console.log(peopleResponse.results,"in use effect")
           peopleListRes = peopleResponse.results.map((result: any, index: number) => {
                return { ...result, homeworld: Math.floor(Math.random() * 5) + 1, species:  Math.floor(Math.random() * 5) + 1, films: Math.floor(Math.random() * 5) + 1}
            })
            setPeopleLists(peopleListRes)
            if(filterObject.homeWorld !== "" || filterObject.films !== "" || filterObject.species !== "") {
                const results = !peopleLoading && peopleResponse && filterPeople(peopleListRes);
                setPeopleLists(results);
                console.log("filter occour")
            }else {
                setPeopleLists(peopleListRes);
            }
        }
    }, [peopleLoading, peopleResponse])

    useEffect(() => {
        if(handleOkState) {
            fetchPeople("https://swapi.dev/api/people/")
        }
        return () => {
            setHandleOkState(false);
        };
    }, [handleOkState, fetchPeople]);

    console.log(peopleLists, "people lists");
    console.log(filterObject, "filter object");
    return (
    <main className="flex min-h-screen flex-col">
        <Modal className="!text-black" title="Filter" open={isFilterModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText={"Close"} okText="Save">
            <div className="grid grid-cols-2 items-center mb-2">
                <span>Home World: </span>
                <div className="w-full">
                    <Select value={searchByHomeWorld} placeholder="Select" allowClear className="!placeholder-white !bg-transparent !w-full" options={[
                        { value: 1, label: 'Jack' },
                        { value: 2, label: 'Lucy' },
                        { value: 3, label: 'yiminghe' },
                        { value: 4, label: 'Disabled'},
                        { value: 5, label: 'Disabled'},
                    ]}
                            onChange={homeWorldFilterHandler}
                    />
                    <div className="w-full text-center">or</div>
                </div>
            </div>
            <div className="grid grid-cols-2 items-center mb-2">
                <span>Species: </span>
                <div className="w-full">
                    <Select value={searchBySpecies} placeholder="Select" allowClear className="!placeholder-white !bg-transparent !w-full" options={[
                        { value: 1, label: 'had' },
                        { value: 2, label: 'Lucy' },
                        { value: 3, label: 'asdasd' },
                        { value: 4, label: 'abled'},
                        { value: 5, label: 'Dled'},
                    ]}
                            onChange={speciesFilterHandler}
                    />
                    <div className="w-full text-center">or</div>
                </div>
            </div>
            <div className="grid grid-cols-2 items-center">
                <span>Films: </span>
                <div>
                    <Select value={searchByFilms} placeholder="Select" allowClear className="!placeholder-white !bg-transparent !w-full" options={[
                        { value: 1, label: 'had' },
                        { value: 2, label: 'Lucy' },
                        { value: 3, label: 'asdasd' },
                        { value: 4, label: 'abled'},
                        { value: 5, label: 'Dled'},
                    ]}
                            onChange={filmsFilterHandler}
                    />
                </div>
            </div>
        </Modal>
        <nav className="p-8 grid grid-cols-3 items-center">
            <div>
            </div>
            <div className="grid justify-items-center">
                <Image src="/star-wars-logo.png" alt="star-wars-logo" width={184} height={80}/>
            </div>
            <div className="flex justify-end !text-white">
                <div className="flex items-center gap-4">
                    <div className="flex items-center text-white">
                        <Button type="text" onClick={showModal} className="!text-white !flex !items-center">
                            Filter
                            <FilterFilled className="!text-white"/>
                        </Button>
                    </div>
                    <div className="text-lg flex gap-x-2 items-center"><SearchOutlined /><Input onChange={searchOnChange} className="!placeholder-white !w-[80px] !text-white" placeholder="Search" bordered={false} /></div>
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
