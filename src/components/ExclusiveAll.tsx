import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from 'axios'

import SearchRstTop from "./SearchRstTop";
import SearchRstMain from "./SearchRstMain";
import Pagination from "./Pagination";
import Loading from "./Loading";

import {loadSession, testData, testFilter} from "../scripts/common";
import "../css/rstPage.css";

function ExclusiveAll() {

    //const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const currPage=searchParams.get("currPage")?searchParams.get("currPage"):"1";
    const queryText=searchParams.get("keyword")?searchParams.get("keyword"):"";

    const [data,setData]=useState([])
    const [rstNum,setRstNum]=useState(0)
    const [isLoading,setIsLoading]=useState(true)

    const totalPage=Math.ceil(rstNum / 50)

    const loadData=async ()=>{
        axios.get(`http://${process.env.REACT_APP_HOST}:8000/exclusive/all?`+searchParams.toString(), {
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


    return (
        isLoading?(<Loading />):(
        <>
            <SearchRstTop query={queryText}/>
            <div id={"rstNum"}>티켓 ({rstNum})</div>
            <SearchRstMain rstNum={rstNum} data={data}/>
            <div id={"pagination"}>
                <div></div>
                    {totalPage > 1 ? <Pagination totalPage={totalPage} currentPage={currPage}/> : <></>}
                <div></div>
            </div>
        </>)
    );
}

export default ExclusiveAll;
