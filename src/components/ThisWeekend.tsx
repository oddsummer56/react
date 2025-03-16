import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import axios from "axios";
import {v4 as uuidv4} from "uuid";
import "../css/main.css";
import MainEntry from "./MainEntry";
import { TicketData } from "../scheme/ticket";
import { loadSession } from "../scripts/common";

const catDictionary: {[key in string]: string} = {
    "콘서트":"concert",
    "연극":"musical",
    "뮤지컬":"musical",
    "뮤지컬/연극":"musical",
    "전시/행사":"exhibit"
}


function ThisWeekend() {
    const isLogin = loadSession('isLogin');
    const [data, setData] = useState<TicketData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('concert');

    const loadData = async () => {
        await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/this_weekend`)
            .then(res => res.data)
            .then(data => {
                //console.log(data)
                setData(data);
                setIsLoading(false);

                /***** banner fetch save ************/
                localStorage.removeItem("WeekendData")
                localStorage.setItem("WeekendData", JSON.stringify(data))
                /***** banner fetch save ************/
            })
            .catch(err => {
                console.error("WeekendData\n└", err)
                console.error(err)
                const json = localStorage.getItem("WeekendData")
                if(json!==null){
                    setData(JSON.parse(json))
                    setIsLoading(false)
                }
            });
    }

    const switchMenu=(v:string)=>{
        const weekends = document.getElementsByClassName("weekend-entity");
        let dispCnt = 0

        Array.from(weekends).forEach((e)=>{
            if (e.className.includes(v) && dispCnt < 4) {
               (e as HTMLElement).style.display = "block";
                dispCnt++
            }
            else (e as HTMLElement).style.display="none";
        })
    }

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

    useEffect(() => {
        loadData()
    }, []);


    return isLoading ?
        <div id="LoadingSection" style={{marginTop:"350px"}}>
            <img src={"/static/media/loading.gif"} alt={"Loading"}/>
            <h3>주말공연 정보 로딩중..</h3>
        </div> 
        : (<div className={"mainSection"} id={"weekend"}>
            <h3>이번 주말을 위한 공연</h3>
            <div className={"selectBtnContainer"}>
                <input type="radio" className="mainRadio WeekendChk" name="WeekendChk" id={"concertRadio"} autoComplete="off"
                       onChange={() => setFilter("concert")} checked={filter === 'concert'}/>
                <label className="mainRadioLabel WeekendChkLabel" htmlFor={"concertRadio"}>콘서트</label>
                <input type="radio" className="mainRadio WeekendChk" name="WeekendChk" id={"musicalRadio"} autoComplete="off"
                       onChange={() => setFilter("musical")} checked={filter === 'musical'}/>
                <label className="mainRadioLabel WeekendChkLabel" htmlFor={"musicalRadio"}>뮤지컬/연극</label>
                <input type="radio" className="mainRadio WeekendChk" name="WeekendChk" id={"exhibitRadio"} autoComplete="off"
                       onChange={() => setFilter("exhibit")} checked={filter === 'exhibit'}/>
                <label className="mainRadioLabel WeekendChkLabel" htmlFor={"exhibitRadio"}>전시/행사</label>
            </div>
            <div className="mainEntryContainer">
                {data.filter(({category})=>catDictionary[category] === filter).slice(0,4).map(j => {
                    return <MainEntry
                        posterImg={j["poster_url"]}
                        showTitle={j["title"]}
                        showLocation={j["location"]}
                        showDate={j["start_date"] + "~" + j["end_date"]}
                        _link={j["id"]}
                        className={`weekend-entity ${catDictionary[j["category"]]}`}
                        likeToggle={isLogin ?{
                            value: j.is_liked,
                            onClick: (e)=>{handleClickLike({id: j.id, isLiked: j.is_liked});
                            }
                        }: undefined}
                        key={uuidv4()}
                        />
                    })
                }
            </div>
        </div>);
}

export default ThisWeekend;
