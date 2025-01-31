import React from "react";
import "../css/rstPage.css";
import {useNavigate} from "react-router-dom";
import {loadSession} from "../scripts/common";

function MainEntry(props:{[key:string]:string|number|boolean|undefined}) {

    const navigate = useNavigate();

    const move= (i: string | number | boolean | undefined)=>{
        navigate("/detail/"+i?.toString());
    }

    return (
        <>
            <div className={"card "+props.className}>
                <img src={props.posterImg?.toString()} alt={"Poster"} className="card-img-top posterImg" onClick={()=>{move(props._link)}} />
                <div className="card-body">
                    <h5 className={"showTitle"} onClick={() => {
                        move(props._link)
                    }}>{props.showTitle}</h5>
                    <small className={"showLocation"}>{props.showLocation}</small><br/>
                    <small className={"showDate"}>{props.showDate}</small><br/>
                    {props.onSale ? <span className="badge text-bg-primary">판매중</span> : <></>
                    }
                    {props.isExclusive ? <span className="badge text-bg-purple">단독판매</span> : <></>}
            </div>
            </div>
        </>
    );
}

export default MainEntry;
