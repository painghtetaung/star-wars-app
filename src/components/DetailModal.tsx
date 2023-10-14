"use client"
import {Modal} from "antd";
import React, {useEffect, useState} from "react";
import useFetchSpec from "@/hooks/useFetchSpec";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton";

type DetailModalProps = {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    detailUrl: string;
}
const DetailModal: React.FC<DetailModalProps> = ({open, onOk,onCancel, detailUrl}) => {
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
                        <div>
                            {
                                personDetail?.name
                            }
                        </div>
                        <div>
                            {
                                personDetail?.height
                            } meters
                        </div>
                        <div>
                            {
                                personDetail?.mass
                            } kg
                        </div>
                        <div>
                            {
                                personDetail?.created
                            }
                        </div>
                        <div>
                            {
                                personDetail?.films?.length - 1
                            }
                        </div>
                        <div>
                            {
                                personDetail?.birth_year
                            }
                        </div>
                        <div>
                            {
                                personDetail?.homeworld?.name
                            }
                        </div>
                        <div>
                            {
                                personDetail?.homeworld?.terrain
                            }
                        </div>
                        <div>
                            {
                                personDetail?.homeworld?.climate
                            }
                        </div>
                        <div>
                            {
                                personDetail?.homeworld?.residents?.length - 1
                            }
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