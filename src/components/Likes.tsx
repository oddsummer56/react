import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import "../css/visited.css"
import IconToggleButton from "./IconToggleButton";
import axios from "axios";

function Likes() {

    const navigate = useNavigate();
    
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadData=async ()=> {
        await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/get_like/hihello`)
            .then(res => res.data)
            .then(json => {
                //console.log(json)
                setData(json)
                setIsLoading(false)
                /***** banner fetch save ************/
                localStorage.removeItem("bannerData")
                localStorage.setItem("bannerData", JSON.stringify(json))
                /***** banner fetch save ************/
            })
            .catch(err=> {
                console.error("banner\n└", err)
                const json = localStorage.getItem("bannerData")
                if(json!==null){
                   setData(JSON.parse(json))
                   setIsLoading(false)
                }
            });
    }



    useEffect( () => {
        loadData()
    }, []);

    const move= (i: string | number | boolean | undefined)=>{
        navigate("/detail/"+i?.toString());
    }

    return (<div style={{textAlign: "center"}}>
        <h2>찜 목록</h2>
        <button className={"btn btn-warning"} onClick={()=>{window.location.href="/"}}
                style={{position: "relative", left: "37vw", top: "-20px"}}>뒤로가기🔙
        </button>
        <IconToggleButton/>
        <div className="visitedContainer" id="visitedContainer" >
            {data.length > 0 ? data.reverse().map(i => {
                    return (<div id="visitedEntry" onClick={() => move(i["id"])}>
                        <img src={i["posterUrl"]} alt={"title poster img"} id={"visitedPoster"} alt={`${i["showTitle"]} 포스터`}/>
                        <div style={{paddingTop:"5px"}}>
                            <div className={"visitedEntryContents"}  id={"visitedEntryTitle"} >{i["showTitle"]}</div>
                            <div className={"visitedEntryContents"} >{i["showLoca"]}</div>
                            <div className={"visitedEntryContents"} >{i["showDate"]}</div>
                        </div>
                    </div>)
                })
                : <div id="visitedNothing">
                    찜 목록이 없습니다.
                </div>
            }
        </div>
    </div>);
}

export default Likes;
