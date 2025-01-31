import React, {useState} from "react";
import {loadSession} from "../scripts/common";
import {useNavigate} from "react-router-dom";

import "../css/visited.css"

function Visited() {

    const navigate = useNavigate();
    const [data, setData] = useState(JSON.parse(loadSession("visited")) as object);
    //console.log(data)

    const move= (i: string | number | boolean | undefined)=>{
        navigate("/detail/"+i?.toString());
    }

    return (<div style={{textAlign: "center"}}>
        <h2>방문기록</h2>
        <button className={"btn btn-warning"} onClick={()=>{window.location.href="/"}}
                style={{position: "relative", left: "37vw", top: "-20px"}}>뒤로가기🔙
        </button>
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
                    방문한 기록이 없습니다.
                </div>
            }
        </div>
    </div>);
}

export default Visited;
