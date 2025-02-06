import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import axios from "axios";
import {ticketHost} from "../scripts/common";
import {v4 as uuidv4} from "uuid";
import "../css/main.css";

// const ticketHost:{[key:string]:string} = {
//     "1" : "인터파크 티켓",
//     "2" : "예스24 티켓",
//     "3" : "티켓링크",
// }
const id2host:{[key:string]:string} = {
    "1" : "interpark",
    "2" : "yes24",
    "3" : "ticketlink",
}

function Entity(props:{[key:string]:string|undefined}) {
    const navigate = useNavigate();

    const move= (i: string | number | boolean | undefined)=>{
        navigate("/detail/"+i?.toString());
    }

    return (<div className={"card exclusive-entity "+props.hosts}>
        <img src={props.posterImg?.toString()} alt={"Poster"} className="card-img-top posterImg" onClick={()=>{move(props._link)}} />
        <div className="card-body">
            <h5 className={"showTitle"} onClick={() => {
                move(props._link)
            }}>{props.showTitle}</h5>
            <small className={"showLocation"}>{props.showLocation}</small><br/>
            <small className={"showDate"}>{props.showDate}</small><br/>
        </div>
    </div>);
}


function ExclusiveBy() {

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const loadData = async () => {
        await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/exclusive/main`)
            .then(res => res.data)
            .then(data => {
                setData(data);
                setIsLoading(false);

                /***** banner fetch save ************/
                localStorage.removeItem("exclusiveData")
                localStorage.setItem("exclusiveData", JSON.stringify(data))
                /***** banner fetch save ************/
            })
            .catch(err => {
                console.error("exclusiveData\n└", err)
                console.error(err)
                const json = localStorage.getItem("exclusiveData")
                if(json!==null){
                    setData(JSON.parse(json))
                    setIsLoading(false)
                }
            });
    }

    // const data=[
    //     {
    //         "_id": 1,
    //         "items": [
    //             {
    //                 "posterImg": "https://ticketimage.interpark.com/Play/image/large/24/24013928_p.gif",
    //                 "showTitle": "뮤지컬 지킬앤하이드 (Jekyll ＆ Hyde) - 20주년",
    //                 "showLocation": "블루스퀘어 신한카드홀",
    //                 "showDate": "2024.11.29 ~2025.05.18",
    //                 "exclusive": "인터파크",
    //                 "onSale": true,
    //                 "isExclusive": true,
    //                 "id": 1
    //             },
    //             {
    //                 "posterImg": "https://ticketimage.interpark.com/Play/image/large/24/24013619_p.gif",
    //                 "showTitle": "뮤지컬 〈스윙 데이즈_암호명 A〉",
    //                 "showLocation": "충무아트센터 대극장",
    //                 "showDate": "2024.11.19 ~2025.02.09",
    //                 "exclusive": "인터파크",
    //                 "onSale": true,
    //                 "isExclusive": true,
    //                 "id": 2
    //             }]
    //     },
    //     {
    //         "_id": 2,
    //         "items": [
    //             {
    //                 "posterImg": "https://ticketimage.interpark.com/Play/image/large/24/24011935_p.gif",
    //                 "showTitle": "뮤지컬 〈광화문연가〉",
    //                 "showLocation": "디큐브 링크아트센터",
    //                 "showDate": "2024.10.23 ~2025.01.05",
    //                 "exclusive": "예스24",
    //                 "onSale": true,
    //                 "isExclusive": true,
    //                 "id":3
    //             },
    //             {
    //                 "posterImg": "https://ticketimage.interpark.com/Play/image/large/24/24014511_p.gif",
    //                 "showTitle": "뮤지컬 〈이프덴〉",
    //                 "showLocation": "홍익대 대학로 아트센터 대극장",
    //                 "showDate": "2024.12.03 ~2025.03.02",
    //                 "exclusive": "예스24",
    //                 "onSale": true,
    //                 "isExclusive": true,
    //                 "id":4
    //             }]
    //     },
    //     {
    //         "_id": 3,
    //         "items": [
    //             {
    //                 "posterImg": "https://ticketimage.interpark.com/Play/image/large/P0/P0004107_p.gif",
    //                 "showTitle": "뮤지컬 〈명성황후〉 30주년 기념 공연",
    //                 "showLocation": "세종문화회관 대극장(자세히)",
    //                 "showDate": "2025.01.21 ~2025.03.30",
    //                 "exclusive": "티켓링크",
    //                 "onSale": true,
    //                 "isExclusive": true,
    //                 "id":5
    //             }, {
    //                 "posterImg": "https://ticketimage.interpark.com/Play/image/large/24/24016412_p.gif",
    //                 "showTitle": "뮤지컬 〈고스트 베이커리〉",
    //                 "showLocation": "두산아트센터 연강홀",
    //                 "showDate": "2024.12.19 ~2025.02.23",
    //                 "exclusive": "티켓링크",
    //                 "onSale": true,
    //                 "isExclusive": true,
    //                 "id":6
    //             }]
    //     }
    // ]



    const switchMenu=(v:string)=>{
        const exclusives = document.getElementsByClassName("exclusive-entity");

        for(let i=0;i<exclusives.length;i++){
            if (exclusives[i].className.includes(v)) exclusives[i].style.display="block";
            else exclusives[i].style.display="none";
        }
        const goExclusive=document.getElementsByClassName("gotoTotalBtn");
        for(let i=0;i<goExclusive.length;i++){
            if (goExclusive[i].className.includes(`go${v}`)) goExclusive[i].style.display="block";
            else goExclusive[i].style.display="none";
        }
    }


    const initSelect=()=>{
        const init_selected=document.getElementById("interpark") as HTMLInputElement;
        if (init_selected===null) setTimeout(()=>{initSelect()},100)
        else init_selected.click()
    }

    useEffect(() => {
        loadData()
        initSelect()
    }, []);


    return isLoading ?
        <div id="LoadingSection">
            <img src={"/static/media/loading.gif"} alt={"Loading"}/>
            <h3>단독판매 정보 로딩중..</h3>
        </div> 
        : (<div className={"mainSection"} id={"exclusive"}>
            <h3>예매처별 단독판매</h3>
            <div className={"selectBtnContainer"}>
                {data.map(i => {
                    return <div key={uuidv4()}>
                        <input type="radio" className="mainRadio exclusiveChk" name="exclusiveChk"
                               id={id2host[i["_id"].toString()]} autoComplete="off"
                               onChange={() => switchMenu(id2host[i["_id"].toString()])}/>
                        <label className="mainRadioLabel exclusiveChkLabel"
                               htmlFor={id2host[i["_id"].toString()]}>{ticketHost[i["_id"].toString()]}</label>
                    </div>
                })}
            </div>
            <div className="mainEntryContainer">

                {data.map(i => {
                    return i["items"].map(j => {
                        return <Entity
                            posterImg={j["poster_url"]}
                            showTitle={j["title"]}
                            showLocation={j["location"]}
                            showDate={j["start_date"] + "~" + j["end_date"]}
                            _link={j["id"]}
                            hosts={id2host[i["_id"].toString()]}
                            key={uuidv4()}
                        />
                    })
                })}
            </div>
            {data.map(i => {
                return <a className={`gotoTotalBtn go${id2host[i["_id"].toString()]}`} href={`/exclusive/all?site_id=${i["_id"]}&currPage=1`} key={uuidv4()} >전체보기 {'>'}</a>
            })}

        </div>);
}

export default ExclusiveBy;
