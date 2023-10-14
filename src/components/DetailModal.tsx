"use client"
import {Modal} from "antd";
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
        error: homeworldLoadingError,
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

    return <>
        {/*Detail modal*/}
        <Modal className="!text-black" open={open} onOk={onOk} onCancel={onCancel} footer={null}
               cancelText={"Close"} okText="Save">
            {
                specResponse && !specLoading &&  !homeworldLoading && homeworldResponse ? (
                    <>
                        <div className="w-full">
                            <Image src={imageUrl} alt="profile-img" className="rounded-lg mx-auto h-[150px]" width={200} height={100}/>
                        </div>
                        <div className="grid grid-cols-2 text-center items-center mt-8">
                            <h2>Name :</h2>
                            <div>{personDetail?.name}</div>
                        </div>
                        <div className="grid grid-cols-2 text-center items-center mt-8">
                            <h2>Height :</h2>
                            <div>{personDetail?.height} meters</div>
                        </div>
                        <div className="grid grid-cols-2 text-center items-center mt-8">
                            <h2>Mass :</h2>
                            <div>{ personDetail?.mass} kg</div>
                        </div>
                        <div className="grid grid-cols-2 text-center items-center mt-8">
                            <h2>Created Date :</h2>
                            <div>{dayjs(personDetail?.created).format('DD-MM-YYYY')}</div>
                        </div>
                        <div className="grid grid-cols-2 text-center items-center mt-8">
                            <h2>Number of Films :</h2>
                            <div>{personDetail?.films?.length}</div>
                        </div>
                        <div className="grid grid-cols-2 text-center items-center mt-8">
                            <h2>Birth Year :</h2>
                            <div>{personDetail?.birth_year}</div>
                        </div>
                        <div className="grid grid-cols-2 text-center items-center mt-8">
                            <h2>HomeWorld :</h2>
                            <div>{personDetail?.homeworld?.name}</div>
                        </div>
                        <div className="grid grid-cols-2 text-center items-center mt-8">
                            <h2>Terrain :</h2>
                            <div>{personDetail?.homeworld?.terrain}</div>
                        </div>
                        <div className="grid grid-cols-2 text-center items-center mt-8">
                            <h2>Climate :</h2>
                            <div>{personDetail?.homeworld?.climate}</div>
                        </div>
                        <div className="grid grid-cols-2 text-center items-center mt-8">
                            <h2>Climate :</h2>
                            <div>{personDetail?.homeworld?.residents?.length}</div>
                        </div>
                    </>
                ) : (
                    <LoadingSkeleton/>
                )
            }
        </Modal>
    </>;
}

export default DetailModal