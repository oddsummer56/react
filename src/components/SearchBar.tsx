import React, {useEffect, useRef} from "react";
//import {useSearchParams} from "react-router-dom";  //https://velog.io/@leah1225/React-%EC%BF%BC%EB%A6%AC-%EC%8A%A4%ED%8A%B8%EB%A7%81Query-String

import "../css/searchBar.css";
import SearchCalendar from "./SearchCalendar";
import {useSearchParams} from "react-router-dom";
import {locaCode, locaCodeRev} from "../scripts/common";


function SearchBar(props: { [key: string]: string|null }) {

    const [searchParams, setSearchParams] = useSearchParams();

    const query=searchParams.get("keyword")
    const queryRef=useRef<HTMLInputElement>(null);

    const locationRef = useRef<HTMLSelectElement>(null);
    const queryLoca=searchParams.get("region")
    //let category = searchParams.get("category")?searchParams.get("category"):""


    const search=()=>{

        const queryInput=document.getElementById("queryText") as HTMLInputElement;
        const queryText = queryInput!==null?queryInput.value:"";
        /*@ts-ignore*/
        const startDate=$("#startDate").val()
        /*@ts-ignore*/
        const endDate=$("#endDate").val()

        if((startDate!=="") !== (endDate!=="")){
            alert("시작일과 종료일을 모두 입력해주세요.")
            return;
        }

        if (startDate>endDate){
            alert("종료일이 시작일보다 작을 수 없습니다.")
            return;
        }

        // if(["연극", "뮤지컬", "콘서트", "전시", "행사"].includes(queryText as string)){
        //     category=queryText
        // }

        // window.location.href= "/search?keyword="+encodeURIComponent(queryText)+"&region="+(locationRef.current && locationRef.current.value!=="전국"?locaCode[locationRef.current.value]:"")+"&start_date="+startDate.split("-").join(".")+"&end_date="+endDate.split("-").join(".")+"&category="+category+"&currPage=1"        // fetch("http://127.0.0.1:8000/",{
        window.location.href= "/search?keyword="+encodeURIComponent(queryText)+"&region="+(locationRef.current && locationRef.current.value!=="전국"?locaCode[locationRef.current.value]:"")+"&start_date="+startDate.split("-").join(".")+"&end_date="+endDate.split("-").join(".")+"&category=&currPage=1"
    }

    useEffect(() => {
        if(queryRef.current) queryRef.current.value = query?query:"";
        if(locationRef.current) if(queryLoca) locationRef.current.value=locaCodeRev[queryLoca]?locaCodeRev[queryLoca]:"전국"
    }, []);

    const onEnter=(e:React.KeyboardEvent)=>{
        if(e.keyCode===13) search()
    }

    return (
        <>
            <div id={"searchContainer"} className={"input-group"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0d6efd"
                     className="bi bi-cursor"
                     viewBox="0 0 16 16"
                     id={"arrowImg"}>
                    <path
                        d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52z"/>
                </svg>
                <select className="form-select" aria-label="City" id={"city"} ref={locationRef} defaultValue={""}>
                    <option>전국</option>
                    <option value="1">서울</option>
                    <option value="2">수도권</option>
                    <option value="3">경상</option>
                    <option value="4">전라</option>
                    <option value="5">강원</option>
                    <option value="6">충청</option>
                    <option value="7">제주</option>
                </select>
                {/*<Calendar placeholder={"시작일"} id={"startDate"} selected={searchParams.get("startDate")} />*/}
                {/*<Calendar placeholder={"종료일"} id={"endDate"} selected={searchParams.get("endDate")} />*/}
                <SearchCalendar />
                <div className={"input-group"}>
                    <input id={"queryText"} type={"text"} ref={queryRef} onKeyUp={onEnter} />
                    <button type={"submit"} className={"btn btn-primary"} onClick={search} id={"searchBtn"}>Search</button>
                </div>
            </div>
        </>
    )
        ;
}

export default SearchBar;

