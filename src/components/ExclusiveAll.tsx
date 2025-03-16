import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from 'axios'

import SearchRstTop from "./SearchRstTop";
import SearchRstMain from "./SearchRstMain";
import Pagination from "./Pagination";
import Loading from "./Loading";

import {loadSession, testData, testFilter} from "../scripts/common";
import "../css/rstPage.css";
import { TicketData, TicketDataWithStatus } from "../scheme/ticket";

function ExclusiveAll() {

    //const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const currPage=searchParams.get("currPage")?searchParams.get("currPage"):"1";
    const queryText=searchParams.get("keyword")?searchParams.get("keyword"):"";

    const [data,setData]=useState<TicketDataWithStatus[]>([])
    const [rstNum,setRstNum]=useState(0)
    const [isLoading,setIsLoading]=useState(true)

    const totalPage=Math.ceil(rstNum / 50)

    const loadData=async ()=>{
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/exclusive/all?`+searchParams.toString(), {
            headers: {
                "Authorization": loadSession("loginToken") || loadSession("kakaoToken") || ""
            }
        })
            .then((res)=> res.data )
            .then((data)=>{
                const f_data=testFilter(data)
                return f_data
            })
            .then((f_data)=>{
                setData(f_data)
                setRstNum(f_data.length)
                setIsLoading(false)
            })
            .catch(err => {
                console.error(err)
                alert("오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.")
                window.history.back()
            })
    }

    //let data;
    useEffect(()=>{
        loadData()
    },[queryText, currPage, searchParams])

    const handleClickLike = async ({id, isLiked}:{id: string; isLiked: boolean}) => {
        try {
            const { data } = await (isLiked ? axios.delete<string>(`${process.env.REACT_APP_API_ENDPOINT}/del_like`,{
                data: {
                    id: id
                }
            }) : axios.post<TicketData>(`${process.env.REACT_APP_API_ENDPOINT}/like`,{
                id: id
            }))
    
            setData(pre => {
                const itemId = typeof data === 'string'? data : data.id;
                const dataIndex = pre.findIndex(({id})=> id===itemId)
                if(dataIndex === -1) return pre;
    
                const newData = [...pre];
                newData[dataIndex].is_liked = !isLiked;
                return newData;
            })
        } catch(e) {
            alert('잠시 후 다시 시도해 주세요')
        }
    }


    return (
        isLoading?(<Loading />):(
        <>
            <SearchRstTop query={queryText}/>
            <div id={"rstNum"}>티켓 ({rstNum})</div>
            <SearchRstMain rstNum={rstNum} data={data} onClickLike={handleClickLike}/>
            <div id={"pagination"}>
                <div></div>
                    {totalPage > 1 ? <Pagination totalPage={totalPage} currentPage={currPage} /> : <></>}
                <div></div>
            </div>
        </>)
    );
}

export default ExclusiveAll;
