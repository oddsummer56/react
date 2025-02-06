import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import axios from "axios";
import {v4 as uuidv4} from "uuid";
import "../css/main.css";

const catDictionary = {
    "콘서트":"concert",
    "연극":"musical",
    "뮤지컬":"musical",
    "뮤지컬/연극":"musical",
    "전시/행사":"exhibit"
}

function Entity(props:{[key:string]:string|undefined}) {
    const navigate = useNavigate();

    const move= (i: string | number | boolean | undefined)=>{
        navigate("/detail/"+i?.toString());
    }

    return (<div className={"card weekend-entity "+props.category}>
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


function ThisWeekend() {

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

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
        let dispCnt=0

        for(let i=0;i<weekends.length;i++){
            if (weekends[i].className.includes(v) && dispCnt<4) {
                weekends[i].style.display = "block";
                dispCnt++
            }
            else weekends[i].style.display="none";
        }
    }


    const initSelect=()=>{
        const init_selected=document.getElementById("concertRadio") as HTMLInputElement;
        if (init_selected===null) setTimeout(()=>{initSelect()},100)
        else init_selected.click()
    }

    useEffect(() => {
        loadData()
        initSelect()
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
                       onChange={() => switchMenu("concert")}/>
                <label className="mainRadioLabel WeekendChkLabel" htmlFor={"concertRadio"}>콘서트</label>
                <input type="radio" className="mainRadio WeekendChk" name="WeekendChk" id={"musicalRadio"} autoComplete="off"
                       onChange={() => switchMenu("musical")}/>
                <label className="mainRadioLabel WeekendChkLabel" htmlFor={"musicalRadio"}>뮤지컬/연극</label>
                <input type="radio" className="mainRadio WeekendChk" name="WeekendChk" id={"exhibitRadio"} autoComplete="off"
                       onChange={() => switchMenu("exhibit")}/>
                <label className="mainRadioLabel WeekendChkLabel" htmlFor={"exhibitRadio"}>전시/행사</label>
            </div>
            <div className="mainEntryContainer">
                {data.map(j => {
                    return <Entity
                        posterImg={j["poster_url"]}
                        showTitle={j["title"]}
                        showLocation={j["location"]}
                        showDate={j["start_date"] + "~" + j["end_date"]}
                        _link={j["id"]}
                        category={catDictionary[j["category"]]}
                        key={uuidv4()}
                        />
                    })
                }
            </div>
        </div>);
}

export default ThisWeekend;
