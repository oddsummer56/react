import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from 'axios'

import SearchRstTop from "./SearchRstTop";
import SearchRstMain from "./SearchRstMain";
import Pagination from "./Pagination";
import WeeklyBest from "./WeeklyBest";
import Loading from "./Loading";

import {loadSession, testFilter} from "../scripts/common";
import "../css/rstPage.css";

function SearchRst() {

    //const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const currPage=searchParams.get("currPage")?searchParams.get("currPage"):"1";
    const queryText=searchParams.get("keyword")?searchParams.get("keyword"):"";

    const [data,setData]=useState([])
    const [rstNum,setRstNum]=useState(0)
    const [isLoading,setIsLoading]=useState(true)

    const totalPage=Math.ceil(rstNum / 50)

    const loadData=async ()=>{
        // await fetch(`http://${process.env.REACT_APP_HOST}:7777/search?`+searchParams.toString(),{
        //     method:"GET",
        //     /*headers:{"Content-Type":"application/json"},
        //     body:JSON.stringify({"token":loadSession("loginToken")})*/
        // })
        //     .then(response => response.json())
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/search?`+searchParams.toString(), {
            headers: {
                "Authorization": loadSession("loginToken") || loadSession("kakaoToken") || ""
            }
        })
            .then((res)=> res.data )
            .then((data)=>{
                // console.log(data)
                const f_data=testFilter(data).map(i=>{
                        if(i["end_date"]==="상시공연") i["onSale"]=true
                        return i
                    })
                return f_data
            })
            .then((f_data)=>{
                const includes=searchParams.get("notSale")?searchParams.get("notSale"):false

                if(includes==="true"){
                    setData(f_data)
                    setRstNum(f_data.length)
                } else {
                    const onSaleData=[]
                    for(let i=0;i<f_data.length;i++){
                        if (f_data[i]["onSale"]) onSaleData.push(f_data[i])
                    }
                    setData(onSaleData)
                    setRstNum(onSaleData.length)
                }
                setIsLoading(false)
            })
            .catch(err => {
                console.error(err)
                alert("오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.")
                window.history.back()
                /*try {
                    console.log(n)
                }
                catch (e) {
                    console.log(e)
                }*/
            })
    }

    const viewNotSale=()=>{
        const href=window.location.href;
        window.location.href=href+"&notSale=true"
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
            { rstNum>0?
                ( <SearchRstMain rstNum={rstNum} data={data}/> )
                :( <div id={"rstMain"}>
                        <div id={"noRst"}>
                            <h4> 검색하신 "{queryText}"에 대한 티켓이 존재하지 않습니다.</h4>
                            <div>다른 검색어를 입력해주세요</div>
                            <button className={"btn btn-secondary"} onClick={viewNotSale}>판매종료/판매예정 보기</button>
                        </div>
                    <WeeklyBest />
                </div> )
            }
    <div id={"pagination"}>
                <div></div>
                {totalPage > 1 ? <Pagination totalPage={totalPage} currentPage={currPage}/> : <></>}
                <div></div>
            </div>
        </>)
    );
}

export default SearchRst;
