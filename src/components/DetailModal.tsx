"use client"
import {message, Modal} from "antd";
import React, {useEffect, useState} from "react";
import useFetchSpec from "@/hooks/useFetchSpec";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton";
import Image from "next/image";
import dayjs from "dayjs";

type DetailModalProps = {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    detailUrl: string;
    imageUrl: string;
}
const DetailModal: React.FC<DetailModalProps> = ({open, onOk,onCancel, detailUrl, imageUrl}) => {
    const [personDetail, setPersonDetail] = useState<any>()
    const {
        mutate: fetchSpec,
        isLoading: specLoading,
        error: specError,
        data: specResponse,
    } = useFetchSpec();

    const {
        mutate: fetchHomeworld,
        isLoading: homeworldLoading,
        error: homeworldError,
        data: homeworldResponse,
    } = useFetchSpec();


    useEffect(() => {
        if(detailUrl) {
            fetchSpec(detailUrl)
        }
    }, [detailUrl, fetchSpec]);


    useEffect(() => {
        if(!specLoading && specResponse) {
            fetchHomeworld(specResponse?.homeworld)
            setPersonDetail(specResponse)
        }
    }, [specLoading, specResponse, fetchHomeworld]);

    useEffect(() => {
        if(!homeworldLoading && homeworldResponse) {
            const personDetailCopy: any = {...personDetail}
            personDetailCopy.homeworld = homeworldResponse
            setPersonDetail({
                ...personDetailCopy
            })
        }
    },[homeworldResponse, homeworldLoading])

    console.log(specResponse?.homeworld?.residents?.length, "person response")
    console.log(specResponse?.homeworld, "person response")
    useEffect( () => {
        if(specError) {
            message.open({
                type: "error",
                // @ts-ignore
                content: specError?.message,
            })
        }
        if(homeworldError) {
            message.open({
                type: "error",
                // @ts-ignore
                content: homeworldError?.message,
            })
        }

    }, [homeworldError, specError]);
    return <>
        {/*Detail modal*/}
        <Modal className="!text-black" open={open} onOk={onOk} onCancel={onCancel} footer={null}
               cancelText={"Close"} okText="Save">
           <div className="!min-h-[300px]" data-testid="detail-modal">
               {
                   specResponse && !specLoading &&  !homeworldLoading && homeworldResponse ? (
                       <div>
                           <div className="w-full">
                               <Image src={imageUrl} alt="profile-img" className="rounded-lg mx-auto h-[150px]" width={200} height={100}/>
                           </div>
                           <div className="grid grid-cols-2 text-center items-center mt-8">
                               <h2>Name :</h2>
                               <div data-testid="name">{personDetail?.name}</div>
                           </div>
                           <div className="grid grid-cols-2 text-center items-center mt-8">
                               <h2>Height :</h2>
                               <div data-testid="height">{personDetail?.height} meters</div>
                           </div>
                           <div className="grid grid-cols-2 text-center items-center mt-8">
                               <h2>Mass :</h2>
                               <div data-testid="mass">{ personDetail?.mass} kg</div>
                           </div>
                           <div className="grid grid-cols-2 text-center items-center mt-8">
                               <h2>Created Date :</h2>
                               <div data-testid="created">{dayjs(personDetail?.created).format('DD-MM-YYYY')}</div>
                           </div>
                           <div className="grid grid-cols-2 text-center items-center mt-8">
                               <h2>Number of Films :</h2>
                               <div data-testid="films">{personDetail?.films?.length}</div>
                           </div>
                           <div className="grid grid-cols-2 text-center items-center mt-8">
                               <h2>Birth Year :</h2>
                               <div data-testid="birth-year">{personDetail?.birth_year}</div>
                           </div>
                           <div className="grid grid-cols-2 text-center items-center mt-8">
                               <h2>HomeWorld :</h2>
                               <div data-testid="homeworld">{personDetail?.homeworld?.name}</div>
                           </div>
                           <div className="grid grid-cols-2 text-center items-center mt-8">
                               <h2>Terrain :</h2>
                               <div data-testid="terrain">{personDetail?.homeworld?.terrain}</div>
                           </div>
                           <div className="grid grid-cols-2 text-center items-center mt-8">
                               <h2>Climate :</h2>
                               <div data-testid="climate">{personDetail?.homeworld?.climate}</div>
                           </div>
                           <div className="grid grid-cols-2 text-center items-center mt-8">
                               <h2>Residents :</h2>
                               <div data-testid="residents">{personDetail?.homeworld?.residents?.length}</div>
                           </div>
                       </div>
                   ) : (
                       <LoadingSkeleton/>
                   )
               }
           </div>
        </Modal>
    </>;
}

export default DetailModal