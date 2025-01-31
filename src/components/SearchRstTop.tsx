import React, {useEffect} from "react";
import "../css/rstPage.css";
import SearchBar from "./SearchBar";
import {useSearchParams} from "react-router-dom";
import {ticketHost} from "../scripts/common";

function SearchRstTop(props:{"query":string|null}) {

    //const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const queryLoca=searchParams.get("region")
    const category=searchParams.get("category")
    const startDate=searchParams.get("start_date")
    const endDate=searchParams.get("end_date")

    let query
    if(props.query){
        query=props.query;
    } else if(category!==""){
        query=category;
    } else if(startDate!=="" && startDate!==null && endDate!==null) {
        query=startDate.split(".").join("-")+"~"+endDate.split(".").join("-");
    } else if(queryLoca!=="" && queryLoca!== null){
        query=queryLoca

    } else {
        query="전체"
    }

    useEffect(()=>{

    },[searchParams]);

    /********* exclusive *************************************************/
    const goExclusive=(id)=>{
        window.location.href=`/exclusive/all?site_id=${id}&currPage=1`
    }
    /********* exclusive end *********************************************/
    return (
        <div id={"searchRstTop"}>
            {/*<div id={"searchRstTopTitle"}> "{props.query}"에 대한 검색결과입니다. </div>*/}
            {window.location.pathname.includes("search") ?
                <>
                    <div id={"searchRstTopTitle"}> "{query}"에 대한 검색결과입니다. </div>
                    <SearchBar queryText={searchParams.get("keyword")}/>
                </>
                :<>
                <div id={"searchRstTopTitle"}> "{ticketHost[searchParams.get("site_id")]}"에서 단독판매하는 티켓입니다. </div>
                    <div id={"exclusiveBtnGroup"}>
                        <button className={"btn btn-primary exclusiveBtn"} onClick={()=>{goExclusive(1)}}>인터파크 티켓</button>
                        <button className={"btn btn-primary exclusiveBtn"} onClick={()=>{goExclusive(2)}}>예스24 티켓</button>
                        <button className={"btn btn-primary exclusiveBtn"} onClick={()=>{goExclusive(3)}}>티켓링크</button>
                    </div>
                </>
            }

        </div>
    );
}

export default SearchRstTop;
