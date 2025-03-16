import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import axios from "axios";
import {loadSession, ticketHost} from "../scripts/common";
import {v4 as uuidv4} from "uuid";
import "../css/main.css";
import MainEntry from "./MainEntry";
import type { ExclusiveByData, TicketData } from "../scheme/ticket"

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


function ExclusiveBy() {
    const isLogin = loadSession('isLogin');

    const [data, setData] = useState<ExclusiveByData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<number>(1);
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

    useEffect(() => {
        loadData()
    }, []);

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

                for(let i=0; i<pre.length; i++) {
                    for(let j=0; j < pre[i].items.length; j++) {
                        if(pre[i].items[j].id === itemId) {
                            const newData = [...pre];
                            newData[i].items[j].is_liked = !isLiked;
                            return newData;
                        }
                    }
                }

                return pre;
            })
        } catch(e) {
            alert('잠시 후 다시 시도해 주세요')
        }
    } 


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
                               onChange={() => setFilter(i._id)} checked={i._id === filter}/>
                        <label className="mainRadioLabel exclusiveChkLabel"
                               htmlFor={id2host[i["_id"].toString()]}>{ticketHost[i["_id"].toString()]}</label>
                    </div>
                })}
            </div>
            <div className="mainEntryContainer">
                {data.filter(({_id})=>_id === filter).slice(0,4).map(i => {
                    return i["items"].map(j => {
                        return <MainEntry
                            posterImg={j["poster_url"]}
                            showTitle={j["title"]}
                            showLocation={j["location"]}
                            showDate={j["start_date"] + "~" + j["end_date"]}
                            _link={j["id"]}
                            className={`exclusive-entity ${id2host[i["_id"].toString()]}`}
                            likeToggle={isLogin ? {
                                value: j.is_liked,
                                onClick: (e)=>{handleClickLike({id: j.id, isLiked: j.is_liked});
                                }
                            }: undefined}
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
